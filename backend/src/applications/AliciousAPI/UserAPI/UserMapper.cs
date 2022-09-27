using AliciousAPI.ViewModels;

namespace AliciousAPI.UserAPI
{
    public static class UserMapper
    {
        public static void MapUserAPI(this WebApplication app)
        {
            app.MapPost("/user/login", UserLogin);
        }

        public static IResult UserLogin(UserLoginRequest googletoken)
        {
            return ResponseViewModel.Create(true, new UserLoginResponse()
            {
                user = new UserViewModel()
                {
                    uid = "fasdfasdf",
                    name = "Lolo",
                    email = "asdfas",
                    rootiid = "",
                    sub = "asdfasdf",
                    fullname = "asdfasdf",
                    pictureurl = "asdfasdf",
                    created = "asdfasdfa",
                },
                token = "token",
            });
        }

        public record UserLoginRequest
        {
            public string googletoken { get; set; }
        }

        public class UserLoginResponse
        {
            public UserViewModel user { get; set; }

            public string token { get; set; }
        }
    }
}
