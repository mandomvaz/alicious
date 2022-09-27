using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DataTransferObjects;

using Ports.Issue;

namespace UserTest
{
    internal class IIssueServiceMock : IIssueService
    {
        public bool AddRootIssueCalled { get; set; }

        public IIssueServiceMock()
        {
            AddRootIssueCalled = false;
        }
        public void AddRootIssue(Guid userGuid)
        {
            this.AddRootIssueCalled = true;
        }

        public Guid RetrieveRootGuid(Guid userGuid)
        {
            throw new NotImplementedException();
        }

        public IssueDTO RetrieveIssueByGuid(Guid issueGuid)
        {
            throw new NotImplementedException();
        }

        public List<IssueDTO> PopulateIssueChilds(List<Guid> guids)
        {
            throw new NotImplementedException();
        }

        public IssueDTO AddIssue(string title, string description, Guid userGuid, Guid fatherGuid, Guid listGuid)
        {
            throw new NotImplementedException();
        }

        public IssueDTO UpdateIssue(IssueDTO issue)
        {
            throw new NotImplementedException();
        }

        public bool RemoveIssue(Guid issueGuid)
        {
            throw new NotImplementedException();
        }

        public IssueListDTO AddList(Guid issueGuid, string title)
        {
            throw new NotImplementedException();
        }

        public bool RemoveList(Guid issueGuid, Guid listGuid)
        {
            throw new NotImplementedException();
        }

        public bool MoveItemFromToList(Guid issueGuid, int neworder, Guid fromList, Guid toList)
        {
            throw new NotImplementedException();
        }

        public bool MoveList(Guid issueGuid, Guid listGuid, bool forward)
        {
            throw new NotImplementedException();
        }

        public List<IssueListDTO> RetrieveListsByIssueGuid(Guid issueGuid)
        {
            throw new NotImplementedException();
        }
    }
}
