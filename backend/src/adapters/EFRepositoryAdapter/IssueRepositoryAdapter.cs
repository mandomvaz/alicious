using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DataTransferObjects;

using EFRepositoryAdapter.DataModel;
using EFRepositoryAdapter.DataModel.Model;
using EFRepositoryAdapter.DTOTransformers;

using Ports.Issue;

namespace EFRepositoryAdapter
{
    internal class IssueRepositoryAdapter : IIssueRepository
    {
        private readonly EFContextFactory _repositoryFactory;

        internal IssueRepositoryAdapter(EFContextFactory factory)
        {
            this._repositoryFactory = factory;
        }

        public IssueDTO Add(IssueDTO issue)
        {
            using (EFDBContext db = _repositoryFactory.CreateContext())
            {
                db.IssueSet.Add(issue.ToModel());
                db.SaveChanges();
            }

            return issue;
        }

        public void RemoveByGuid(Guid guid)
        {
            using(EFDBContext db = _repositoryFactory.CreateContext())
            {
                var issueToRemove = db.IssueSet.Single(s => s.Guid == guid);
                db.IssueSet.Remove(issueToRemove);
                db.SaveChanges();
            }
        }

        public IssueDTO RetrieveByGuid(Guid guid)
        {
            using (EFDBContext db = _repositoryFactory.CreateContext())
            {
                return db.IssueSet.FirstOrDefault(i => i.Guid == guid).ToDTO();
            }
        }

        public IssueDTO RetrieveRootIssueByUserGuid(Guid userGuid)
        {
            using (EFDBContext db = _repositoryFactory.CreateContext())
            {
                return db.IssueSet.FirstOrDefault(i => i.OwnerGuid == userGuid && i.FatherGuid == Guid.Empty).ToDTO();
            }
        }

        public IssueDTO UpdateIssue(IssueDTO issue)
        {
            IssueEFModel issueNewData = issue.ToModel();

            using(EFDBContext db = _repositoryFactory.CreateContext())
            {
                IssueEFModel originalIssue = db.IssueSet.Single(s => s.Guid == issue.Guid);

                originalIssue.OwnerGuid = issueNewData.OwnerGuid;
                originalIssue.FatherGuid = issueNewData.FatherGuid;
                originalIssue.Title = issueNewData.Title;
                originalIssue.Description = issueNewData.Description;
                originalIssue.Childs = issueNewData.Childs;

                db.SaveChanges();
            }

            return issue;
        }

        public void AddIssueList(IssueListDTO newList)
        {
            using (EFDBContext db = _repositoryFactory.CreateContext())
            {
                db.IssueListSet.Add(newList.ToModel());
                db.SaveChanges();
            }
        }

        public List<IssueListDTO> GetAllIssueLists(Guid issueGuid)
        {
            List<IssueListDTO> ret;
            using (EFDBContext db = _repositoryFactory.CreateContext())
            {
                ret = db.IssueListSet.Where(w => w.IssueGuid == issueGuid).ToList().Select(s => s.ToDTO()).ToList();
            }

            return ret;
        }

        public void RemoveList(Guid listGuid)
        {
            using (EFDBContext db = _repositoryFactory.CreateContext())
            {
                var list = db.IssueListSet.Single(w => w.Guid == listGuid);
                db.IssueListSet.Remove(list);
                db.SaveChanges();
            }
        }

        public void UpdateList(IssueListDTO listDTO)
        {
            var list = listDTO.ToModel();
            using (EFDBContext db = _repositoryFactory.CreateContext())
            {
                var targetList = db.IssueListSet.Single(w => w.Guid == list.Guid);
                
                targetList.Title = list.Title;
                targetList.Issues = list.Issues;
                targetList.Order = list.Order;

                db.SaveChanges();
            }
        }
    }
}
