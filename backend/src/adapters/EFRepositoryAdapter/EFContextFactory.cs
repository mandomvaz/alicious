using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using EFRepositoryAdapter.DataModel;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

namespace EFRepositoryAdapter
{
    public class EFContextFactory
    {
        private readonly DbContextOptions<EFDBContext> options;
        public EFContextFactory()
        {
            var optionsBuilder = new DbContextOptionsBuilder<EFDBContext>();

            IConfiguration iconfig = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", true, true)
            .Build();

            string connectionstring = iconfig["connectionstring"];//"Server=localhost;Database=alicious;Uid=root;Pwd=9638;";
            optionsBuilder.UseMySql(connectionstring, ServerVersion.AutoDetect(connectionstring));

            this.options = optionsBuilder.Options;
        }

        public EFContextFactory(DbContextOptions<EFDBContext> options)
        {
            this.options = options;
        }

        public EFDBContext CreateContext()
        {
            EFDBContext context = new EFDBContext(this.options);
            context.Database.EnsureCreated();
            return context;
        }
    }
}
