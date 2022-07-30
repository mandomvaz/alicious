using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Text.RegularExpressions;

using DataTransferObjects;

using EFRepositoryAdapter;

using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;

using Issue;

using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;

using Ports.User;

using User;

namespace AliciousUIAPI.Auth
{
    public class AliciousAuthHandler : AuthenticationHandler<AliciousAuthSchemeOptions>
    {
        private IUserService UserService;
        public AliciousAuthHandler(IOptionsMonitor<AliciousAuthSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock,
            IUserService userService)
            : base(options, logger, encoder, clock)
        {
            this.UserService = userService;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey(HeaderNames.Authorization))
            {
                return AuthenticateResult.Fail("Header Not Found.");
            }

            var header = Request.Headers[HeaderNames.Authorization].ToString();

            var GToken = header;

            var payload = await GoogleJsonWebSignature.ValidateAsync(GToken);

            UserDTO user = this.UserService.RetrieveByEmail(payload.Email);

            if (user == null)
            {
                user = this.UserService.AddUser(payload.GivenName, payload.Name, payload.Email, payload.Picture, payload.Subject);
            }

            var claims = new[] {
                    new Claim(ClaimTypes.NameIdentifier, user.Guid.ToString()),
                    new Claim(ClaimTypes.Email, payload.Email),
                    new Claim(ClaimTypes.Name, payload.GivenName),
            };

            var claimsIdentity = new ClaimsIdentity(claims,
                        nameof(AliciousAuthHandler));

            var ticket = new AuthenticationTicket(
                new ClaimsPrincipal(claimsIdentity), this.Scheme.Name);

            return AuthenticateResult.Success(ticket);
        }
    }
}
