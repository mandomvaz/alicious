using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFRepositoryAdapter.DataModel.Model
{
    public class UserModel
    {
        [Key]
        public Guid Guid { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Picture { get; set; }
        public string Sub { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
