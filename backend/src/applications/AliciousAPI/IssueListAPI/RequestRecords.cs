namespace AliciousAPI.IssueListAPI.RequestRecords
{
    public record AddIssueListAPIRequest
    {
        public string iid { get; set; }
        public string title { get; set; }
    }

    public record MoveToIssueListAPIRequest
    {
        public string iid { get; set; }
        public string targetposition { get; set; }
        public string fromlid { get; set; }
        public string tolid { get; set; }
    }

    public record MoveListForwardIssueListAPIRequest
    {
        public string iid { get; set; }
        public string lid { get; set; }
        public bool forward { get; set; }
    }
}
