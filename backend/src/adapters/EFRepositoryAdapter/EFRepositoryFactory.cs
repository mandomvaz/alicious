using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using EFRepositoryAdapter.DataModel;

using Microsoft.EntityFrameworkCore;

using Ports.Issue;
using Ports.User;

namespace EFRepositoryAdapter
{
    public class EFRepositoryFactory
    {
        private readonly EFContextFactory factory;

        internal EFRepositoryFactory()
        {
            factory = new EFContextFactory();
        }

        internal EFRepositoryFactory(DbContextOptions<EFDBContext> options)
        {
            factory = new EFContextFactory(options);
        }

        public IIssueRepository CreateIIssueRepository()
        {
            return new IssueRepositoryAdapter(this.factory);
        }

        public IUserRepository CreateIUserRepository()
        {
            return new UserRepositoryAdapter(factory);
        }

        public static EFRepositoryFactory InstanceForTest(string dbname)
        {
            DbContextOptionsBuilder<EFDBContext> options = new DbContextOptionsBuilder<EFDBContext>();

            options.UseInMemoryDatabase(dbname);

            return new EFRepositoryFactory(options.Options);
        }

        public static EFRepositoryFactory Instance()
        {
            return new EFRepositoryFactory();
        }
    }
}
