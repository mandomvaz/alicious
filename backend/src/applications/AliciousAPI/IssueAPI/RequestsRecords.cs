namespace AliciousAPI.IssueAPI.RequestsRecords
{
    public record AddIssueAPIRequest
    {
        public string iid { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string fatheriid { get; set; }
        public string lid { get; set; }

    }

    public record UpdateIssueAPIRequest
    {
        public string iid { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string lid { get; set; }
    }

  //  //{
  //"title": "asdfasd",
  //"description": "fasdfasasdfasdfasdfasdf",
  //"iid": "c16d2dc4-f5bb-4739-b2ab-f13e2d7deab7",
  //"lid": ""
public record GetIssueAPIRequest
    {
        public string iid { get; set; }
    }

    public record DeleteIssueAPIRequest
    {
        public string iid { get; set; }
        public string lid { get; set; }
    }
}
