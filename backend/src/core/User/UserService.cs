using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            _userRepository = repo;
            _issueService = issueService;
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

            UserDTO userDTO = _userRepository.AddUser(user);

            _issueService.AddRootIssue(userDTO.Guid);

            return user;
        }

        public UserDTO Login(string token)
        {
            return _userRepository.AddUser(new UserModel());
        }

        public UserDTO RetrieveByEmail(string email)
        {
            throw new NotImplementedException();
        }
    }
}
