using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DataTransferObjects;

namespace Ports.User
{
    public interface IUserRepository
    {
        public UserDTO AddUser(UserDTO user);
        public UserDTO RetrieveByEmail(string email);
    }
}
