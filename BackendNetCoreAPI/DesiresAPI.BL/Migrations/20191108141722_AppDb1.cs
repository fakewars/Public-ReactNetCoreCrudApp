using Microsoft.EntityFrameworkCore.Migrations;

namespace DesiresAPI.BL.Migrations
{
    public partial class AppDb1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsInactive",
                table: "Desires");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Desires",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Desires");

            migrationBuilder.AddColumn<bool>(
                name: "IsInactive",
                table: "Desires",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
