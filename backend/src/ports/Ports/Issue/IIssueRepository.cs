using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DataTransferObjects;

namespace Ports.Issue
{
    public interface IIssueRepository
    {
        IssueDTO Add(IssueDTO issue);
        IssueDTO RetrieveByGuid(Guid guid);
        IssueDTO RetrieveRootIssueByUserGuid(Guid userGuid);
        IssueDTO UpdateIssue(IssueDTO issue);
        void RemoveByGuid(Guid guid);
        List<IssueListDTO> GetAllIssueLists(Guid issueGuid);
        void AddIssueList(IssueListDTO newList);
        void UpdateList(IssueListDTO list);
        void RemoveList(Guid listGuid);
    }
}
