global using EFRepositoryAdapter;
global using Issue;
global using Ports.Issue;
global using Ports.User;
global using User;
global using DataTransferObjects;

using AliciousAPI;


using AliciousUIAPI.Auth;

using Microsoft.AspNetCore.Authorization;
using AliciousAPI.IssueAPI;
using AliciousAPI.UserAPI;
using AliciousAPI.IssueListAPI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(
    options => options.DefaultScheme = "AliciousAuthScheme")
    .AddScheme<AliciousAuthSchemeOptions, AliciousAuthHandler>(
        "AliciousAuthScheme", options => { });

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowAnyOrigin();
                      });
});

builder.AddAliciousDI();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.MapIssueAPI();
app.MapIssueListAPI();
app.MapUserAPI();
//app.MapPost("/issue/getrootissue", getrootissue);
//app.MapPost("/issue/add", add);
//app.MapPost("/issue/delete", delete);
//app.MapPost("/issue/update", update);


//app.MapPost("/issuelist/update", update);
//app.MapPost("/issuelist/add", add);
//app.MapPost("/issuelist/moveto", moveto);
//app.MapPost("/issuelist/movelistforward", movelistforward);

app.UseCors(MyAllowSpecificOrigins);
app.Run();