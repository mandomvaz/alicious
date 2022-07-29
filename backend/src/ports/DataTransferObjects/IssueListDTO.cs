using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataTransferObjects
{
    public abstract class IssueListDTO
    {
        public Guid Guid { get; set; }
        public Guid IssueGuid { get; set; }
        public string Title { get; set; }
        public List<IssueListItemDTO> Issues { get; set; }
        public int Order { get; set; }
    }

    public abstract class IssueListItemDTO
    {
        public Guid IssueGuid { get; set; }
        public int Order { get; set; }
    }
}
