using EFRepositoryAdapter;

using Issue;

using Ports.Issue;
using Ports.User;

using User;

namespace AliciousAPI
{
    internal static class DI
    {
        internal static void AddAliciousDI(this WebApplicationBuilder builder)
        {
            builder.Services.AddSingleton<EFRepositoryFactory>(sp =>
            {
                //return EFRepositoryFactory.InstanceForTest("TestMinimalAPI");
                return EFRepositoryFactory.Instance();
            });

            builder.Services.AddScoped<IIssueRepository>(sp =>
            {
                EFRepositoryFactory RepositoryFactory = sp.GetService<EFRepositoryFactory>();
                return RepositoryFactory.CreateIIssueRepository();
            });

            builder.Services.AddScoped<IUserRepository>(sp =>
            {
                EFRepositoryFactory RepositoryFactory = sp.GetService<EFRepositoryFactory>();
                return RepositoryFactory.CreateIUserRepository();
            });

            builder.Services.AddScoped<IIssueService>(sp =>
            {
                IIssueRepository iissue = sp.GetService<IIssueRepository>();
                return new IssueService(iissue);
            });

            builder.Services.AddScoped<IUserService>(sp =>
            {
                IUserRepository iuser = sp.GetService<IUserRepository>();
                IIssueService iissue = sp.GetService<IIssueService>();
                return new UserService(iuser, iissue);
            });
        }
    }
}
