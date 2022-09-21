using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DataTransferObjects;

using EFRepositoryAdapter.DataModel.Model;

using Newtonsoft.Json;

namespace IssueTest
{
    internal static class Helpers
    {
        public static IssueDTO CreateIssueDTO(Guid guid, Guid fatherguid, Guid userguid, List<Guid> childs)
        {
            return new IssueTestModel()
            {
                Guid = guid,
                Description = $"Description Issue {guid}",
                FatherGuid = fatherguid,
                OwnerGuid = userguid,
                Title = $"Issue {guid}",
                TimeStamp = DateTime.Now,
                Childs = childs ?? new List<Guid>()
            };
        }

        public static IssueListDTO CreateIssueList(Guid guid, Guid issueguid, int order, List<IssueTestModel> issues)
        {
            int ordercounter = 0;
            List<IssueListItemDTO> issueslist = new List<IssueListItemDTO>();
            foreach (var item in issues)
            {
                issueslist.Add(new IssueListItemTestModel() { IssueGuid = item.Guid, Order = ++ordercounter });
            }

            return new IssueListTestModel()
            {
                Guid = guid,
                IssueGuid = issueguid,
                Order = order,
                Title = $"List {order} {guid}",
                Issues = issueslist
            };
        }

        public static IssueEFModel ToModel(this IssueDTO issue)
        {
            return new IssueEFModel()
            {
                Guid = issue.Guid,
                OwnerGuid = issue.OwnerGuid,
                FatherGuid = issue.FatherGuid,
                Title = issue.Title,
                Description = issue.Description,
                Childs = JsonConvert.SerializeObject(issue.Childs),
                TimeStamp = issue.TimeStamp,
            };
        }

        public static IssueListModel ToModel(this IssueListDTO issueListDTO)
        {
            return new IssueListModel
            {
                Guid = issueListDTO.Guid,
                IssueGuid = issueListDTO.IssueGuid,
                Title = issueListDTO.Title,
                Issues = JsonConvert.SerializeObject(issueListDTO.Issues),
                Order = issueListDTO.Order,
            };
        }

        
    }

    internal class IssueTestModel : IssueDTO
    {

    }

    internal class IssueListTestModel : IssueListDTO
    {

    }

    internal class IssueListItemTestModel : IssueListItemDTO
    {

    }

}
