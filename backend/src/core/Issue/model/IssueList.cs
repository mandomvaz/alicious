using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DataTransferObjects;

namespace Issue.model
{
    internal class IssueList : IssueListDTO
    {
        public Guid Guid { get; set; }
        public string Title { get; set; }
        public List<IssueListItem> Issues { get; set; }
        public int Order { get; set; }

        public IssueList() { }

        public IssueList(IssueListDTO list)
        {
            Guid = list.Guid;
            Title = list.Title;
            Issues = list.Issues.Select(s => new IssueListItem(s)).ToList();
        }

        public void InsertItem(Guid issueGuid, int order)
        {
            IssueListItem newItem = new IssueListItem()
            {
                IssueGuid = issueGuid,
                Order = order,
            };

            Issues.ForEach(item => { item.Order = (item.Order >= newItem.Order) ? item.Order + 1 : item.Order; });
            Issues.Add(newItem);
        }

        public void RemoveItem(Guid issueGuid)
        {
            IssueListItem itemToRemove = Issues.Single(s => s.IssueGuid == issueGuid);
            
            Issues.Remove(itemToRemove);
            Issues.ForEach(item => { item.Order = (item.Order >= itemToRemove.Order) ? item.Order - 1 : item.Order; });
        }
    }


    internal class IssueListItem : IssueListItemDTO
    {
        public Guid IssueGuid { get; set; }
        public int Order { get; set; }

        public IssueListItem() { }
        public IssueListItem(IssueListItemDTO item)
        {
            IssueGuid = item.IssueGuid;
            Order = item.Order;
        }
    }
}
