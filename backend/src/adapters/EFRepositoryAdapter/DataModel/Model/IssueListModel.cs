using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFRepositoryAdapter.DataModel.Model
{
    public class IssueListModel
    {
        [Key]
        public Guid Guid { get; set; }
        public Guid IssueGuid { get; set; }
        public string Title { get; set; }
        public string Issues { get; set; }
        public int Order { get; set; }
    }
}
