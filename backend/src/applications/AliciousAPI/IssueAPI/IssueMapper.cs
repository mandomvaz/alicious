
using System.Security.Claims;

using AliciousAPI.IssueAPI.RequestsRecords;
using AliciousAPI.Utils;
using AliciousAPI.ViewModels;

using Microsoft.AspNetCore.Mvc;

using Newtonsoft.Json;

namespace AliciousAPI.IssueAPI
{
    public static class IssueMapper
    {
        public static void MapIssueAPI(this WebApplication app)
        {
            app.MapPost("/issue/get", Get);
            app.MapPost("/issue/getrootissue", GetRootIssue);
            app.MapPost("/issue/add", Add);
            app.MapPost("/issue/delete", Delete);
            app.MapPost("/issue/update", Update);
        }

        public static IResult GetRootIssue(IIssueService IssueService, IHttpContextAccessor contextAccessor)
        {
            Guid userGuid = new Guid(contextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            Guid rootIssueGuid = IssueService.RetrieveRootGuid(userGuid);

            var result = RetrieveIssuePopulatedByGUID(rootIssueGuid, IssueService);

            return ResponseViewModel.Create(true, result);
        }

        public static IResult Get(IIssueService IssueService, GetIssueAPIRequest request)
        {
            var result = RetrieveIssuePopulatedByGUID(new Guid(request.iid), IssueService);

            return ResponseViewModel.Create(true, result);
        }

        private static IssueViewModel RetrieveIssuePopulatedByGUID(Guid issueGuid, IIssueService IssueService)
        {
            IssueDTO retrievedIssue = IssueService.RetrieveIssueByGuid(issueGuid);
            List<IssueDTO> retrievedIssueChilds = IssueService.PopulateIssueChilds(retrievedIssue.Childs);

            IssueViewModel returnIssue = new IssueViewModel(retrievedIssue);
            returnIssue.childs = retrievedIssueChilds.Select(s => new IssueViewModel(s)).ToList();
            returnIssue.lists = new List<IssueListViewModel>();

            List<IssueListDTO> listsDTOs = IssueService.RetrieveListsByIssueGuid(issueGuid);

            List<IssueListViewModel> lists = new List<IssueListViewModel>();

            listsDTOs.OrderBy(o => o.Order).ToList().ForEach(listdto =>
            {
                IssueListViewModel list = new IssueListViewModel();
                list.lid = listdto.Guid.ToString();
                list.title = listdto.Title;
                list.position = listdto.Order;
                list.issues = new List<IssueViewModel>();

                listdto.Issues.OrderBy(o => o.Order).ToList().ForEach(i =>
                {
                    list.issues.Add(returnIssue.childs.Single(s => s.iid == i.IssueGuid.ToString()));
                });

                returnIssue.lists.Add(list);
            });

            return returnIssue;
        }

        public static IResult Add(IIssueService IssueService, IHttpContextAccessor contextAccessor, AddIssueAPIRequest requestData)
        {
            Guid userGuid = new Guid(contextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var issuedto = IssueService.AddIssue(requestData.title, requestData.description, userGuid, new Guid(requestData.fatheriid), new Guid(requestData.lid));

            return ResponseViewModel.Create(true, issuedto.Guid.ToString());
        }

        public static IResult Delete(IIssueService IssueService, DeleteIssueAPIRequest request)
        {
            var result = IssueService.RemoveIssue(request.iid.ToGUID());

            return ResponseViewModel.Create(result, result);
        }

        public static IResult Update(IIssueService IssueService, UpdateIssueAPIRequest request)
        {
            IssueDTO issue = IssueService.RetrieveIssueByGuid(request.iid.ToGUID());

            issue.Title = request.title;
            issue.Description = request.description;

            var result = IssueService.UpdateIssue(issue);

            return ResponseViewModel.Create(true, string.Empty);
        }
    }
}
