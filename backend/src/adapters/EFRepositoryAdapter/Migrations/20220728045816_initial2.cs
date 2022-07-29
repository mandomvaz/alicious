using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EFRepositoryAdapter.Migrations
{
    public partial class initial2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Childs",
                table: "IssueSet",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Childs",
                table: "IssueSet");
        }
    }
}
