using AliciousAPI.ViewModels;

using Google.Apis.Auth;

namespace AliciousAPI.UserAPI
{
    public static class UserMapper
    {
        public static void MapUserAPI(this WebApplication app)
        {
            app.MapPost("/user/login", UserLogin);
        }

        public static IResult UserLogin(IUserService UserService, IIssueService IssueService,  UserLoginRequest googletoken)
        {
            var GoogleTask = GoogleJsonWebSignature.ValidateAsync(googletoken.googletoken);

            GoogleTask.Wait();

            if (GoogleTask.IsCompletedSuccessfully)
            {
                UserDTO user = UserService.RetrieveByEmail(GoogleTask.Result.Email);

                Guid rootGuid = IssueService.RetrieveRootGuid(user.Guid);

                return ResponseViewModel.Create(true, new UserLoginResponse()
                {
                    user = new UserViewModel()
                    {
                        uid = user.Guid.ToString(),
                        name = user.Name,
                        email = user.Email,
                        rootiid = rootGuid.ToString(),
                        sub = user.Sub,
                        fullname = user.FullName,
                        pictureurl = user.Picture,
                        created = user.Timestamp.ToShortDateString(),
                    },
                    token = googletoken.googletoken,
                });
            }
            else
            {
                return Results.StatusCode(500);
            }




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
