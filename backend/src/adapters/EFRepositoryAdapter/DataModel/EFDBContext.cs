using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using EFRepositoryAdapter.DataModel.Model;

using Microsoft.EntityFrameworkCore;

namespace EFRepositoryAdapter.DataModel
{
    public class EFDBContext : DbContext
    {
        public DbSet<UserModel> UserSet { get; set; }
        public DbSet<IssueEFModel> IssueSet { get; set; }
        public DbSet<IssueListModel> IssueListSet { get; set; }
        public EFDBContext()
        {
        }

        public EFDBContext(DbContextOptions<EFDBContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string connectionstring = "Server=localhost;Database=alicious;Uid=root;Pwd=9638;";
                optionsBuilder.UseMySql(connectionstring, ServerVersion.AutoDetect(connectionstring));
            }
        }
    }
}
