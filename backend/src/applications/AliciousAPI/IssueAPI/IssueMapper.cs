
using Microsoft.AspNetCore.Mvc;

namespace AliciousAPI.IssueAPI
{
    public static class IssueMapper
    {
        public static void MapIssueAPI(this WebApplication app)
        {
            app.MapPost("/issue/get", Get);
        }

        public static IResult Get(IIssueService IssueService, IssueViewModel issue)
        {
            int i = 1;

            return Results.Json(IssueService.RetrieveRootGuid(Guid.Empty));
        }
    }
}
