namespace AliciousAPI.ViewModels
{
    public class IssueListViewModel
    {
        public string lid { get; set; }
        public string title { get; set; }
        public string iid { get; set; }
        public List<IssueViewModel> issues { get; set; }
        public int position { get; set; }
        public string services { get; set; }
        public string created { get; set; }
    }
}
