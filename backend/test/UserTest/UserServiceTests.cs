using DataTransferObjects;

using EFRepositoryAdapter;
using EFRepositoryAdapter.DataModel;
using EFRepositoryAdapter.DataModel.Model;

using Microsoft.EntityFrameworkCore;

using Ports.Issue;
using Ports.User;

using User;

namespace UserTest
{
    public class UserServiceTests
    { 

        private UserService _userService;
        private IIssueServiceMock _issueServiceMock;
        private EFRepositoryFactory _repoFactory;
        private IUserRepository _userRepo;
        private EFDBContext _DBContext;

        [OneTimeSetUp]
        public void SetUp()
        {
            string inMemoryDBName = "UserServiceTests";

            _issueServiceMock = new IIssueServiceMock();
            IIssueService issueService = _issueServiceMock;

            _repoFactory = EFRepositoryFactory.InstanceForTest(inMemoryDBName);

            _userRepo = _repoFactory.CreateIUserRepository();

            _userService = new UserService(_userRepo, issueService);


            DbContextOptionsBuilder<EFDBContext> options = new DbContextOptionsBuilder<EFDBContext>();

            options.UseInMemoryDatabase(inMemoryDBName);

            _DBContext = new EFDBContext(options.Options);


        }

        [Test]
        public void AddUser()
        {
            string name = "Lolo";
            string fullname = "Manuel Domínguez Vázquez";
            string email = "mandomvaz@gmail.com";
            string picture = "http://url.url";
            string sub = "adsfasdfasdfasdfasdfasdfasdfasdfas";

            UserDTO userAdded = _userService.AddUser(name, fullname, email, picture, sub);

            Assert.AreEqual(userAdded.Name, name);
            Assert.AreEqual(userAdded.FullName, fullname);
            Assert.AreEqual(userAdded.Email, email);
            Assert.AreEqual(userAdded.Picture, picture);
            Assert.AreEqual(userAdded.Sub, sub);

            Assert.IsTrue(_issueServiceMock.AddRootIssueCalled);
        }
        [Test]
        public void RetrieveByEmail()
        {
            UserModel user = new UserModel()
            {
                Guid = Guid.NewGuid(),
                FullName = "Dummy Dummy Dummy",
                Email = "dummy@dummy.d",
                Name = "Dummy",
                Picture = "http://dummy.dummy/asdf",
                Sub = "sdgfasdfasdfsadfasdfsadfas",
                Timestamp = DateTime.Now
            };

            _DBContext.UserSet.Add(user);
            _DBContext.SaveChanges();

            UserDTO userRetrieved = _userService.RetrieveByEmail(user.Email);

            Assert.AreEqual(userRetrieved.Name, user.Name);
            Assert.AreEqual(userRetrieved.FullName, user.FullName);
            Assert.AreEqual(userRetrieved.Email,    user.Email);
            Assert.AreEqual(userRetrieved.Picture,  user.Picture);
            Assert.AreEqual(userRetrieved.Sub,  user.Sub);
            Assert.AreEqual(userRetrieved.Guid, user.Guid);
        }
    }
}