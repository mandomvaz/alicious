using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFRepositoryAdapter.DataModel.Model
{
    public class IssueEFModel
    {
        [Key]
        public Guid Guid { get; set; }
        public Guid OwnerGuid { get; set; }
        public Guid FatherGuid { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Childs { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
