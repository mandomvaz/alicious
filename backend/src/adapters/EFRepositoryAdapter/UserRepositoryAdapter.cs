using DataTransferObjects;

using EFRepositoryAdapter.DataModel;
using EFRepositoryAdapter.DataModel.Model;
using EFRepositoryAdapter.DTOTransformers;

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
            using (EFDBContext db = this._repositoryFactory.CreateContext())
            {
                var ret = db.UserSet.Add(user.ToModel()).Entity.ToDTO();
                db.SaveChanges();
                return ret;
            }
        }

        public UserDTO UpdateUser(UserDTO user)
        {
            using (EFDBContext db = this._repositoryFactory.CreateContext())
            {
                UserModel originalUser = db.UserSet.Single(s => s.Guid == user.Guid);

                originalUser.Name = user.Name;
                originalUser.FullName = user.FullName;
                originalUser.Email = user.Email;
                originalUser.Picture = user.Picture;
                originalUser.Sub = user.Sub;

                db.SaveChanges();

                return originalUser.ToDTO();
            }
        }

        public UserDTO RetrieveByEmail(string email)
        {
            using (var db = this._repositoryFactory.CreateContext())
            {
                return db.UserSet.SingleOrDefault(s => s.Email == email)?.ToDTO();
            }
        }
    }

}