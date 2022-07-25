namespace DataTransferObjects;
public abstract class UserDTO
{
    public Guid Guid { get; set; }
    public string Name { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Picture { get; set; }
    public string Sub { get; set; }
    public DateTime Timestamp { get; set; }
}
