namespace DataTransferObjects
{
    public abstract class IssueDTO
    {
        public Guid Guid { get; set; }
        public Guid OwnerGuid { get; set; }
        public Guid FatherGuid { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<Guid> Childs { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
