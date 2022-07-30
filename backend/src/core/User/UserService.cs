using DataTransferObjects;

using Ports.Issue;
using Ports.User;

using User.Model;

namespace User
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;
        private IIssueService _issueService;

        public UserService(IUserRepository repo, IIssueService issueService)
        {
            this._userRepository = repo;
            this._issueService = issueService;
        }

        public UserDTO AddUser(string name, string fullname, string email, string picture, string sub)
        {
            UserModel user = new UserModel()
            {
                Email = email,
                FullName = fullname,
                Name = name,
                Picture = picture,
                Sub = sub,
                Guid = Guid.NewGuid(),
            };

            UserDTO userDTO = this._userRepository.AddUser(user);

            this._issueService.AddRootIssue(userDTO.Guid);

            return user;
        }

        public UserDTO Login(string token)
        {
            return this._userRepository.AddUser(new UserModel());
        }

        public UserDTO RetrieveByEmail(string email)
        {
            return this._userRepository.RetrieveByEmail(email);
        }
    }
}
