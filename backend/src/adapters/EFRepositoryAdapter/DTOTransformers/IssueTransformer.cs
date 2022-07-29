using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DataTransferObjects;

using EFRepositoryAdapter.DataModel.Model;

using Newtonsoft.Json;

namespace EFRepositoryAdapter.DTOTransformers
{
    internal static class IssueTransformer
    {
        internal static IssueDTO ToDTO(this IssueEFModel issue)
        {
            return new IssueEF()
            {
                Guid = issue.Guid,
                OwnerGuid = issue.OwnerGuid,
                FatherGuid = issue.FatherGuid,
                Title = issue.Title,
                Description = issue.Description,
                Childs = JsonConvert.DeserializeObject<List<Guid>>(issue.Childs),
                TimeStamp = issue.TimeStamp,
            };
        }

        internal static IssueEFModel ToModel(this IssueDTO issue)
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
    }

    internal class IssueEF : IssueDTO
    {

    }
}
