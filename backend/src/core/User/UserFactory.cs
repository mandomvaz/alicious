using DataTransferObjects;
using User.Model;

namespace User;
public static class UserFactory
{
    public static UserDTO Create()
    {
        return new UserModel();
    }
}
