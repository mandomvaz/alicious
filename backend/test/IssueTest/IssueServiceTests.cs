using DataTransferObjects;

using EFRepositoryAdapter;

using Issue;

using Ports.Issue;

namespace IssueTest
{
    public class IssueServiceTests
    {
        private EFRepositoryFactory _repoFactory;
        private IIssueRepository _issueRepository;
        private IIssueService _issueService;

        private Guid _DummyUserGuid;
        private IssueDTO _RootIssueDummyUser;
        private List<IssueDTO> _IssuesDummyUser;
        private List<IssueListDTO> _RootIssueDummyUserLists;

        [OneTimeSetUp]
        public void Setup()
        {
            string inMemoryDBName = "IssueTests";
            _repoFactory = EFRepositoryFactory.InstanceForTest(inMemoryDBName);
            _issueRepository = _repoFactory.CreateIIssueRepository();
            _issueService = new IssueService(_issueRepository);

            _DummyUserGuid = Guid.NewGuid();

            Guid rootissueguid = Guid.NewGuid();

            _IssuesDummyUser = new List<IssueDTO>()
            {
                //lista1
                Helpers.CreateIssueDTO(Guid.NewGuid(), rootissueguid, _DummyUserGuid, null),
                Helpers.CreateIssueDTO(Guid.NewGuid(), rootissueguid, _DummyUserGuid, null),
                Helpers.CreateIssueDTO(Guid.NewGuid(), rootissueguid, _DummyUserGuid, null),
                Helpers.CreateIssueDTO(Guid.NewGuid(), rootissueguid, _DummyUserGuid, null),

                //lista2
                Helpers.CreateIssueDTO(Guid.NewGuid(), rootissueguid, _DummyUserGuid, null),
                Helpers.CreateIssueDTO(Guid.NewGuid(), rootissueguid, _DummyUserGuid, null),
                Helpers.CreateIssueDTO(Guid.NewGuid(), rootissueguid, _DummyUserGuid, null),
                Helpers.CreateIssueDTO(Guid.NewGuid(), rootissueguid, _DummyUserGuid, null),

                //lista3
                Helpers.CreateIssueDTO(Guid.NewGuid(), rootissueguid, _DummyUserGuid, null),
                Helpers.CreateIssueDTO(Guid.NewGuid(), rootissueguid, _DummyUserGuid, null),
                Helpers.CreateIssueDTO(Guid.NewGuid(), rootissueguid, _DummyUserGuid, null),
                Helpers.CreateIssueDTO(Guid.NewGuid(), rootissueguid, _DummyUserGuid, null),
            };

            _RootIssueDummyUser = Helpers.CreateIssueDTO(rootissueguid, Guid.Empty, _DummyUserGuid, _IssuesDummyUser.Select(i => i.Guid).ToList());

            _RootIssueDummyUserLists = new List<IssueListDTO>()
            {
                Helpers.CreateIssueList(Guid.NewGuid(), rootissueguid, 0, _IssuesDummyUser.Cast<IssueTestModel>().Take(4).ToList()),
                Helpers.CreateIssueList(Guid.NewGuid(), rootissueguid, 1, _IssuesDummyUser.Cast<IssueTestModel>().Skip(4).Take(4).ToList()),
                Helpers.CreateIssueList(Guid.NewGuid(), rootissueguid, 2, _IssuesDummyUser.Cast<IssueTestModel>().Skip(8).Take(4).ToList()),
            };

            var db = _repoFactory.factory.CreateContext();

            db.IssueSet.Add(_RootIssueDummyUser.ToModel());

            _IssuesDummyUser.ForEach(i => db.IssueSet.Add(i.ToModel()));

            _RootIssueDummyUserLists.ForEach(i => db.IssueListSet.Add(i.ToModel()));

            db.SaveChanges();
        }

        [Test]
        public void AddRootIssue()
        {
            Guid userGuid = Guid.NewGuid();
            
            _issueService.AddRootIssue(userGuid);

            var rootissue = _repoFactory.factory.CreateContext().IssueSet.SingleOrDefault(i => i.OwnerGuid == userGuid);

            Assert.NotNull(rootissue);

            Assert.AreEqual(rootissue.FatherGuid, Guid.Empty);
        }

        [Test]
        public void RetrieveIssueByGuid()
        {
            var issue = _issueService.RetrieveIssueByGuid(_IssuesDummyUser[3].Guid);

            Assert.NotNull(issue);
            Assert.AreEqual(issue.FatherGuid, _IssuesDummyUser[3].FatherGuid);
            Assert.AreEqual(issue.Title, _IssuesDummyUser[3].Title);
        }

        [Test]
        public void PopulateIssueChilds()
        {

        }

        [Test]
        public void RetrieveRootGuid()
        {
            var rootissueguid = _issueService.RetrieveRootGuid(_DummyUserGuid);

            Assert.NotNull(rootissueguid);
            Assert.AreEqual(rootissueguid, _RootIssueDummyUser.Guid);
        }

        [Test]
        public void AddIssue()
        {
            var db = _repoFactory.factory.CreateContext();

            int preAddCount = db.IssueSet.Count();

            string title = "AddIssueTest";
            string desc = "AddIssueTest Description";

            var serviceResult = _issueService.AddIssue(title, desc, _DummyUserGuid, _RootIssueDummyUser.Guid, _RootIssueDummyUserLists[0].Guid);

            int postAddCount = db.IssueSet.Count();
            Assert.Greater(postAddCount, preAddCount);

            var postIssue = db.IssueSet.SingleOrDefault(i => i.Title == "AddIssueTest");
            Assert.IsNotNull(postIssue);
            Assert.AreEqual(postIssue.Title, title);
            Assert.AreEqual(postIssue.Description, desc);
            Assert.AreEqual(postIssue.OwnerGuid, _DummyUserGuid);
            Assert.AreEqual(postIssue.FatherGuid, _RootIssueDummyUser.Guid);
            

            var postList = db.IssueListSet.SingleOrDefault(l => l.Guid == _RootIssueDummyUserLists[0].Guid);
            Assert.IsNotNull(postList);
            Assert.IsTrue(postList.Issues.Contains(serviceResult.Guid.ToString()));            
        }

        [Test]
        public void UpdateIssue()
        {
            var preIssue = _IssuesDummyUser[0];

            preIssue.Title = "Updated Title";
            preIssue.Description = "Updated Description";
            
            var serviceResult = _issueService.UpdateIssue(preIssue);

            var db = _repoFactory.factory.CreateContext();

            var postIssue = db.IssueSet.SingleOrDefault(i => i.Guid == preIssue.Guid);

            Assert.AreEqual(postIssue.Title, preIssue.Title);
            Assert.AreEqual(postIssue.Description, preIssue.Description);
        }

        [Test]
        public void RemoveIssue()
        {
            var preIssue = _IssuesDummyUser[1];

            var serviceResult = _issueService.RemoveIssue(preIssue.Guid);

            Assert.IsTrue(serviceResult);

            var db = _repoFactory.factory.CreateContext();

            var postIssue = db.IssueSet.Any(i => i.Guid == preIssue.Guid);
            Assert.IsFalse(postIssue);

            var fatherIssue = db.IssueSet.SingleOrDefault(i => i.Guid == _RootIssueDummyUser.Guid);
            Assert.NotNull(fatherIssue);

            var noExistsIssueInFather = !fatherIssue.Childs.Contains(preIssue.Guid.ToString());
            Assert.IsTrue(noExistsIssueInFather);

            var listZero = db.IssueListSet.SingleOrDefault(l => l.Guid == _RootIssueDummyUserLists[0].Guid);
            Assert.NotNull(listZero);
            var noExistsInList = !listZero.Issues.Contains(preIssue.Guid.ToString());
            Assert.IsTrue(noExistsInList);
        }

        [Test]
        public void AddList()
        {
            string title = "AddListTest list";
            var db = _repoFactory.factory.CreateContext();

            int preCount = db.IssueListSet.Count();

            var serviceResult = _issueService.AddList(_IssuesDummyUser[3].Guid, title);

            int postCount = db.IssueListSet.Count();
            Assert.Greater(postCount, preCount);

            var postList = db.IssueListSet.SingleOrDefault(l => l.Title == title);
            Assert.NotNull(postList);
            Assert.AreNotEqual(Guid.Empty, postList.Guid);
        }

        [Test]
        public void RemoveList()
        {
            var db = _repoFactory.factory.CreateContext();

            var preList = _RootIssueDummyUserLists[2];
            var preIssuesCount = db.IssueSet.Count();

            
            var serviceResult = _issueService.RemoveList(_RootIssueDummyUser.Guid, preList.Guid);
            Assert.IsTrue(serviceResult);

            var noExistsList = !db.IssueListSet.Any(i => i.Guid == preList.Guid);
            Assert.IsTrue(noExistsList);

            var postIssueCount = db.IssueSet.Count();
            Assert.AreEqual(preIssuesCount - postIssueCount, preList.Issues.Count());

        }

        [Test]
        public void MoveItemFromToList()
        {
            var serviceResult = _issueService.MoveItemFromToList(_RootIssueDummyUserLists[1].Issues[1].IssueGuid, 0, _RootIssueDummyUserLists[1].Guid, _RootIssueDummyUserLists[0].Guid);

            var db = _repoFactory.factory.CreateContext();

            var fromList = db.IssueListSet.Single(l => l.Guid == _RootIssueDummyUserLists[1].Guid);
            Assert.IsTrue(!fromList.Issues.Contains(_RootIssueDummyUserLists[1].Issues[1].IssueGuid.ToString()));

            var toList = db.IssueListSet.Single(l => l.Guid == _RootIssueDummyUserLists[0].Guid);
            Assert.IsTrue(toList.Issues.Contains(_RootIssueDummyUserLists[1].Issues[1].IssueGuid.ToString()));
        }

        [Test]
        public void MoveListForward()
        {
            var db = _repoFactory.factory.CreateContext();
            var preLists = db.IssueListSet.Where(w => w.IssueGuid == _RootIssueDummyUser.Guid).ToList().OrderBy(o => o.Order).ToList();

            var serviceResult = _issueService.MoveList(_RootIssueDummyUser.Guid, preLists[0].Guid, true);

            db = _repoFactory.factory.CreateContext();
            var postLists = db.IssueListSet.Where(w => w.IssueGuid == _RootIssueDummyUser.Guid).ToList().OrderBy(o => o.Order).ToList();

            Assert.AreEqual(preLists[0].Guid, postLists[1].Guid);
            Assert.AreEqual(preLists[1].Guid, postLists[0].Guid);
            Assert.AreEqual(preLists[2].Guid, postLists[2].Guid);
        }

        [Test]
        public void MoveListBackward()
        {
            var db = _repoFactory.factory.CreateContext();
            var preLists = db.IssueListSet.Where(w => w.IssueGuid == _RootIssueDummyUser.Guid).ToList().OrderBy(o => o.Order).ToList();

            var serviceResult = _issueService.MoveList(_RootIssueDummyUser.Guid, preLists[2].Guid, false);

            db = _repoFactory.factory.CreateContext();
            var postLists = db.IssueListSet.Where(w => w.IssueGuid == _RootIssueDummyUser.Guid).ToList().OrderBy(o => o.Order).ToList();

            Assert.AreEqual(preLists[0].Guid, postLists[0].Guid);
            Assert.AreEqual(preLists[1].Guid, postLists[2].Guid);
            Assert.AreEqual(preLists[2].Guid, postLists[1].Guid);
        }
    }
}