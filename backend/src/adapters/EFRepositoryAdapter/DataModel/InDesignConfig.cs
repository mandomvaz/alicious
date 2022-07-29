using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore.Design;

namespace EFRepositoryAdapter.DataModel
{
    internal class InDesignConfig : IDesignTimeDbContextFactory<EFDBContext>
    {
        public EFDBContext CreateDbContext(string[] args)
        {
            return new EFDBContext();
        }
    }
}
