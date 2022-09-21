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
        public List<IssueListItem> _Issues { get; set; }
        public IssueList() { }

        public IssueList(IssueListDTO list)
        {
            Guid = list.Guid;
            IssueGuid = list.IssueGuid;
            Title = list.Title;
            Issues = list.Issues.Select(s => new IssueListItem(s)).Cast<IssueListItemDTO>().ToList();
            Order = list.Order;
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
            IssueListItem itemToRemove = Issues.Cast<IssueListItem>().Single(s => s.IssueGuid == issueGuid);
            
            Issues.Remove(itemToRemove);
            Issues.ForEach(item => { item.Order = (item.Order >= itemToRemove.Order) ? item.Order - 1 : item.Order; });
        }
    }


    internal class IssueListItem : IssueListItemDTO
    {
        public IssueListItem() { }
        public IssueListItem(IssueListItemDTO item)
        {
            IssueGuid = item.IssueGuid;
            Order = item.Order;
        }
    }
}
