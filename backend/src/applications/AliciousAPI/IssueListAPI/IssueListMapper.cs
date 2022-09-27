

using AliciousAPI.IssueListAPI.RequestRecords;
using AliciousAPI.Utils;
using AliciousAPI.ViewModels;

namespace AliciousAPI.IssueListAPI
{
    public static class IssueListMapper
    {
        public static void MapIssueListAPI(this WebApplication app)
        {
            app.MapPost("/list/update", Update);
            app.MapPost("/list/add", Add);
            app.MapPost("/list/moveto", MoveTo);
            app.MapPost("/list/movelistforward", MoveListForward);

            //'/list/update', list
            //'/list/add', list
            //'/list/moveto', params
            //'/list/movelistforward', params
        }

        public static IResult Update(IIssueService IssueService, IssueListViewModel issue)
        {
            int i = 1;

            return Results.Json(IssueService.RetrieveRootGuid(Guid.Empty));
        }

        public static IResult Add(IIssueService IssueService, AddIssueListAPIRequest request)
        {
            var listdto = IssueService.AddList(new Guid(request.iid), request.title);

            IssueListViewModel list = new IssueListViewModel()
            {
                iid = listdto.IssueGuid.ToString(),
                lid = listdto.Guid.ToString(),
                position = listdto.Order,
                issues = new List<IssueViewModel>(),
                title = listdto.Title
            };

            return ResponseViewModel.Create(true, list);
        }

        public static IResult MoveTo(IIssueService IssueService, MoveToIssueListAPIRequest request)
        {
            var issue = IssueService.RetrieveIssueByGuid(request.iid.ToGUID());
            var tolist = IssueService.RetrieveListsByIssueGuid(issue.FatherGuid).Single(l => l.Guid == request.tolid.ToGUID());
            int targetOrder = (request.targetposition == String.Empty)?
                tolist.Issues.Count :
                tolist.Issues.Single(i => i.IssueGuid == request.targetposition.ToGUID()).Order;

            bool result = IssueService.MoveItemFromToList(request.iid.ToGUID(), targetOrder, request.fromlid.ToGUID(), request.tolid.ToGUID());

            return ResponseViewModel.Create(result, result);
        }

        public static IResult MoveListForward(IIssueService IssueService, MoveListForwardIssueListAPIRequest request)
        {
            var result = IssueService.MoveList(request.iid.ToGUID(), request.lid.ToGUID(), request.forward);

            return ResponseViewModel.Create(result, result);
        }
    }

}
