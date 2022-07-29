using DataTransferObjects;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;
using EFRepositoryAdapter;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using User;
using Ports.User;
using Issue;

namespace AliciousUIAPI.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        private EFRepositoryFactory _repositoryFactory;

        public UserController() : base()
        {
            this._repositoryFactory = EFRepositoryFactory.Instance();
            this._userService = new UserService(_repositoryFactory.CreateIUserRepository(),
                                                new IssueService(_repositoryFactory.CreateIIssueRepository()));
        }
    }
}
