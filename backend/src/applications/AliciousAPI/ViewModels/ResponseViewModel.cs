namespace AliciousAPI.ViewModels
{
    public class ResponseViewModel
    {
        public bool success { get; set; }
        public object payload { get; set; }

        public static IResult Create(bool s, object p)
        {
            return Results.Json(new ResponseViewModel()
            {
                success = s,
                payload = p
            });
        }
    }
}
