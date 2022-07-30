using DataTransferObjects;

using EFRepositoryAdapter;

using Ports.Issue;
using Ports.User;

using User;

namespace UserTest
{
    public class UserServiceTests
    {
        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void Test1()
        {
            IIssueServiceMock issueServiceMock = new IIssueServiceMock();
            IIssueService issueService = issueServiceMock;

            EFRepositoryFactory repoFactory = EFRepositoryFactory.InstanceForTest("UserServiceTests");
            
            IUserRepository userRepo = repoFactory.CreateIUserRepository();

            UserService userService = new UserService(userRepo, issueService);

            string name = "Lolo";
            string fullname = "Manuel Domínguez Vázquez";
            string email = "mandomvaz@gmail.com";
            string picture = "http://url.url";
            string sub = "adsfasdfasdfasdfasdfasdfasdfasdfas";

            UserDTO userAdded = userService.AddUser(name, fullname, email, picture, sub);

            Assert.AreEqual(userAdded.Name, name);
            Assert.AreEqual(userAdded.FullName, fullname);
            Assert.AreEqual(userAdded.Email, email);
            Assert.AreEqual(userAdded.Picture, picture);
            Assert.AreEqual(userAdded.Sub, sub);

            Assert.IsTrue(issueServiceMock.AddRootIssueCalled);
        }
    }
}