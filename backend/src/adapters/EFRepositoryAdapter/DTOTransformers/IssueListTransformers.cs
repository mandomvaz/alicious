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
    internal static class IssueListTransformers
    {
        public static IssueListDTO ToDTO(this IssueListModel issueList)
        {
            List<IssueListItemDTO> itemsDTO = new List<IssueListItemDTO>();

            itemsDTO.AddRange(JsonConvert.DeserializeObject<List<IssueListItemEF>>(issueList.Issues));

            return new IssueListEF()
            {
                Guid = issueList.Guid,
                IssueGuid = issueList.IssueGuid,
                Title = issueList.Title,
                Issues = itemsDTO,
                Order = issueList.Order,
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

    internal class IssueListEF : IssueListDTO
    {
    }

    internal class IssueListItemEF : IssueListItemDTO 
    {
    }
}
