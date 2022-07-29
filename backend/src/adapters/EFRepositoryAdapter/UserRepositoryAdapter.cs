using DataTransferObjects;

using Ports.User;

namespace EFRepositoryAdapter
{
    internal class UserRepositoryAdapter : IUserRepository
    {
        private readonly EFContextFactory _repositoryFactory;

        internal UserRepositoryAdapter(EFContextFactory factory)
        {
            this._repositoryFactory = factory;
        }

        public UserDTO AddUser(UserDTO user)
        {
            return new UserRepoModel();
        }

        public UserDTO UpdateUser(UserDTO user)
        {
            return new UserRepoModel();
        }

        public UserDTO RetrieveByEmail(string email)
        {
            return new UserRepoModel();
        }
    }

    internal class UserRepoModel : UserDTO
    {
    }
}