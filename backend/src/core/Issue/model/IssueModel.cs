using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DataTransferObjects;

namespace Issue.model
{
    internal class IssueModel : IssueDTO
    {
        public IssueModel()
        {
        }

        public IssueModel(IssueDTO issueDTO)
        {
            Guid = issueDTO.Guid;
            OwnerGuid = issueDTO.OwnerGuid;
            FatherGuid = issueDTO.FatherGuid;
            Title = issueDTO.Title;
            Description = issueDTO.Description;
            Childs = issueDTO.Childs;
            TimeStamp = issueDTO.TimeStamp;
        }
    }
}
