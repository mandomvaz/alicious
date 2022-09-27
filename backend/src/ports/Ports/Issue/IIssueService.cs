using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DataTransferObjects;

namespace Ports.Issue
{
    public interface IIssueService
    {
        public void AddRootIssue(Guid userGuid);
        public Guid RetrieveRootGuid(Guid userGuid);
        public IssueDTO RetrieveIssueByGuid(Guid issueGuid);
        public List<IssueDTO> PopulateIssueChilds(List<Guid> guids);
        public IssueDTO AddIssue(string title, string description, Guid userGuid, Guid fatherGuid, Guid listGuid);
        public IssueDTO UpdateIssue(IssueDTO issue);
        public bool RemoveIssue(Guid issueGuid);
        public bool MoveList(Guid issueGuid, Guid listGuid, bool forward);
        public List<IssueListDTO> RetrieveListsByIssueGuid(Guid issueGuid);
        public IssueListDTO AddList(Guid issueGuid, string title);
        public bool RemoveList(Guid issueGuid, Guid listGuid);
        public bool MoveItemFromToList(Guid issueGuid, int neworder, Guid fromList, Guid toList);

    }
}
