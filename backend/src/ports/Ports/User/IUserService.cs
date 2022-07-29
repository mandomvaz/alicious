using DataTransferObjects;

namespace Ports.User;
public interface IUserService
{
    public UserDTO RetrieveByEmail(string email);
    UserDTO? AddUser(string name, string fullname, string email, string picture, string sub);
}
