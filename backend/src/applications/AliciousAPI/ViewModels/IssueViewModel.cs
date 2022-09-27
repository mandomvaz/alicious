
using Newtonsoft.Json;

namespace AliciousAPI.ViewModels
{
    public class IssueViewModel
    {
        public string iid { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string fatheriid { get; set; }
        public List<IssueViewModel> childs { get; set; }
        public List<IssueListViewModel> lists { get; set; }

        public IssueViewModel() { }
        public IssueViewModel(IssueDTO dto)
        {
            iid = dto.Guid.ToString();
            title = dto.Title;
            description = dto.Description;
            fatheriid = dto.FatherGuid.ToString();
            childs = new List<IssueViewModel>();
        }
    }



    //{ "name" : "uid", "type" : "string" },
    //          { "name" : "name", "type" : "string" },
    //          { "name" : "email", "type" : "string" },
    //          { "name" : "rootiid", "type" : "string" },
    //          { "name" : "sub", "type": "string"},
    //          { "name" : "fullname", "type": "string"},
    //          { "name" : "pictureurl", "type": "string"},
    //          { "name" : "created", "type" : "datetime"}



    //{ "name" : "iid", "type" : "string" },
    //            { "name" : "title", "type" : "string" },
    //            { "name" : "description", "type" : "longtext" },
    //            { "name" : "fatheriid", "type" : "string" },
    //            { "name" : "childs", "type" : "json" },
    //            { "name" : "services", "type" : "json" },
    //            { "name" : "created", "type" : "datetime"}


    //{ "name" : "lid", "type" : "string" },
    //          { "name" : "title", "type" : "string" },
    //          { "name" : "iid", "type" : "string" },
    //          { "name" : "issues", "type" : "json" },
    //          { "name" : "position", "type": "integer"},
    //          { "name" : "services", "type" : "json" },
    //          { "name" : "created", "type" : "datetime"}
}
