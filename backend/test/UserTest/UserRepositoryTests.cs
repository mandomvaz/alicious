using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DataTransferObjects;

using EFRepositoryAdapter;
using EFRepositoryAdapter.DataModel;

using Ports.Issue;
using Ports.User;

namespace UserTest
{
    internal class UserRepositoryTests
    {
        [Test]
        public void AddUser()
        {
            IIssueService issueService = new IIssueServiceMock();

            EFRepositoryFactory repoFactory = EFRepositoryFactory.InstanceForTest("UserServiceTests");

            IUserRepository userRepo = repoFactory.CreateIUserRepository();

            string name = "Lolo";
            string fullname = "Manuel Domínguez Vázquez";
            string email = "mandomvaz@gmail.com";
            string picture = "http://url.url";
            string sub = "adsfasdfasdfasdfasdfasdfasdfasdfas";

            UserDTOTest userToAdd = new UserDTOTest()
            {
                Name = name,
                FullName = fullname,
                Email = email,
                Picture = picture,
                Sub = sub,
                Guid = Guid.NewGuid(),
                Timestamp = DateTime.Now
            };

            UserDTO userAdded = userRepo.AddUser(userToAdd);

            Assert.AreEqual(userAdded.Name, userToAdd.Name);
            Assert.AreEqual(userAdded.FullName, userToAdd.FullName);
            Assert.AreEqual(userAdded.Email, userToAdd.Email);
            Assert.AreEqual(userAdded.Picture, userToAdd.Picture);
            Assert.AreEqual(userAdded.Sub, userToAdd.Sub);
            Assert.AreEqual(userAdded.Guid, userToAdd.Guid);
            Assert.AreEqual(userAdded.Timestamp, userToAdd.Timestamp);

            EFDBContext db = repoFactory.factory.CreateContext();
            Assert.That(1, 
                        Is.EqualTo(db.UserSet.Where(w => w.Guid == userToAdd.Guid).Count())
                        );
        }
    }
}
