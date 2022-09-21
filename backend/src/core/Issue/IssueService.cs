using DataTransferObjects;

using Issue.model;

using Ports.Issue;

namespace Issue;
public class IssueService : IIssueService
{
    private readonly IIssueRepository _issueRepository;

    public IssueService(IIssueRepository repo)
    {
        this._issueRepository = repo;
    }

    public void AddRootIssue(Guid userGuid)
    {
        IssueModel issue = new IssueModel()
        {
            Guid = Guid.NewGuid(),
            Childs = new List<Guid>(),
            Description = "Root Issue",
            FatherGuid = Guid.Empty,
            OwnerGuid = userGuid,
            Title = "Root Issue",
        };

        this._issueRepository.Add(issue);
    }

    public IssueDTO RetrieveIssueByGuid(Guid userGuid)
    {
        return new IssueModel(_issueRepository.RetrieveByGuid(userGuid));
    }

    public List<IssueDTO> PopulateIssueChilds(List<Guid> guids)
    {
        List<IssueDTO> list = new List<IssueDTO>();

        guids.ForEach(g =>
        {
            list.Add(this._issueRepository.RetrieveByGuid(g));
        });

        return list;
    }

    public Guid RetrieveRootGuid(Guid userGuid)
    {
        IssueDTO issue = _issueRepository.RetrieveRootIssueByUserGuid(userGuid);

        return (issue == null) ? Guid.Empty : issue.Guid;
    }

    public IssueDTO AddIssue(string title, string description, Guid userGuid, Guid fatherGuid, Guid listGuid)
    {
        IssueModel issue = new IssueModel()
        {
            Guid = Guid.NewGuid(),
            FatherGuid = fatherGuid,
            OwnerGuid = userGuid,
            Title = title,
            Description = description,
            Childs = new List<Guid>(),
            TimeStamp = DateTime.Now,
        };

        var ret = _issueRepository.Add(issue);

        IssueModel father = new IssueModel(_issueRepository.RetrieveByGuid(fatherGuid));
        father.Childs.Add(issue.Guid);
        this.UpdateIssue(father);
        var prelist = this._issueRepository.GetAllIssueLists(father.Guid).Single(s => s.Guid == listGuid);
        var list = new IssueList(prelist);
        list.InsertItem(issue.Guid, list.Issues.Count);
        this._issueRepository.UpdateList(list);

        return ret;
    }

    public IssueDTO UpdateIssue(IssueDTO issue)
    {
        return this._issueRepository.UpdateIssue(issue);
    }

    public bool RemoveIssue(Guid issueGuid)
    {
        IssueDTO issueToRemove = this._issueRepository.RetrieveByGuid(issueGuid);

        IssueModel fatherIssue = new IssueModel(this._issueRepository.RetrieveByGuid(issueToRemove.FatherGuid));
        fatherIssue.Childs.Remove(issueToRemove.Guid);
        this.UpdateIssue(fatherIssue);

        this.MoveItemToTrashList(
            issueGuid,
            this._issueRepository.GetAllIssueLists(fatherIssue.Guid).Single(f => f.Issues.Any(w => w.IssueGuid == issueGuid)).Guid);


        issueToRemove.Childs.ForEach(i =>
        {
            this.RemoveIssue(i);
        });

        this._issueRepository.RemoveByGuid(issueToRemove.Guid);

        return true;
    }

    public IssueListDTO AddList(Guid issueGuid, string title)
    {
        List<IssueListDTO> issueLists = this._issueRepository.GetAllIssueLists(issueGuid);

        IssueList newlist = new IssueList()
        {
            Guid = Guid.NewGuid(),
            IssueGuid = issueGuid,
            Title = title,
            Order = (issueLists.Any())? issueLists.Max(m => m.Order) + 1 : 1,
            Issues = new List<IssueListItemDTO>(),
        };

        this._issueRepository.AddIssueList(newlist);

        return newlist;
    }

    public bool RemoveList(Guid issueGuid, Guid listGuid)
    {
        List<IssueListDTO> issueLists = this._issueRepository.GetAllIssueLists(issueGuid);
        IssueListDTO targetIssuelist = issueLists.Single(s => s.Guid == listGuid);

        targetIssuelist.Issues.ForEach(issue => { this.RemoveIssue(issue.IssueGuid); });

        issueLists.Remove(targetIssuelist);

        int neworder = 0;
        var updatedIssueLists = issueLists.OrderBy(o => o.Order).Select(s =>
        {
            var newlist = new IssueList(s);
            newlist.Order = neworder;
            neworder += 1;
            return newlist;
        }).ToList();

        updatedIssueLists.ForEach(l => { this._issueRepository.UpdateList(l); });
        this._issueRepository.RemoveList(targetIssuelist.Guid);

        return true;
    }

    public bool MoveItemFromToList(Guid issueGuid, int neworder, Guid fromList, Guid toList)
    {
        Guid fatherGuid = this._issueRepository.RetrieveByGuid(issueGuid).FatherGuid;
        List<IssueList> lists = this._issueRepository.GetAllIssueLists(fatherGuid).Select(s => new IssueList(s)).ToList();

        IssueList from = lists.Single(s => s.Guid == fromList);
        from.RemoveItem(issueGuid);

        this._issueRepository.UpdateList(from);

        if (neworder >= 0 && toList != Guid.Empty)
        {
            IssueList to = lists.Single(s => s.Guid == toList);
            to.InsertItem(issueGuid, neworder);

            this._issueRepository.UpdateList(to);
        }

        return true;
    }

    public bool MoveItemToTrashList(Guid issueGuid, Guid listGuid)
    {
        return this.MoveItemFromToList(issueGuid, -1, listGuid, Guid.Empty);
    }

    public bool MoveList(Guid issueGuid, Guid listGuid, bool forward)
    {
        List<IssueList> lists = this._issueRepository.GetAllIssueLists(issueGuid).Select(s => new IssueList(s)).ToList();

        IssueList target = lists.Single(s => s.Guid == listGuid);

        List<IssueList> listsBelow = lists.Where(l => l.Order < target.Order).OrderBy(o => o.Order).ToList();
        List<IssueList> listsAbove = lists.Where(l => l.Order > target.Order).OrderBy(o => o.Order).ToList();

        List<IssueList> resultList = new List<IssueList>();

        if (forward)
        {
            resultList.AddRange(listsBelow);
            resultList.Add(listsAbove.First());
            resultList.Add(target);
            resultList.AddRange(listsAbove.Skip(1));
        }
        else
        {
            resultList.AddRange(listsBelow.Take(listsBelow.Count - 1));
            resultList.Add(target);
            resultList.Add(listsBelow.Last());
            resultList.AddRange(listsAbove);
        }

        int order = 0;
        resultList.ForEach(l =>
        {
            l.Order = order;
            order++;
            this._issueRepository.UpdateList(l);
        });

        return true;
    }
}
