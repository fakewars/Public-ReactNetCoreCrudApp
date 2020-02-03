using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DesiresAPI.BL.Migrations
{
    public partial class CreateAppDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DayRecords",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DayRecords", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Desires",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Desires", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DayDesire",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DesireId = table.Column<int>(nullable: true),
                    Score = table.Column<int>(nullable: false),
                    Comment = table.Column<string>(nullable: true),
                    DayRecordId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DayDesire", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DayDesire_DayRecords_DayRecordId",
                        column: x => x.DayRecordId,
                        principalTable: "DayRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DayDesire_Desires_DesireId",
                        column: x => x.DesireId,
                        principalTable: "Desires",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Option",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Score = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    DesireId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Option", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Option_Desires_DesireId",
                        column: x => x.DesireId,
                        principalTable: "Desires",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DayDesire_DayRecordId",
                table: "DayDesire",
                column: "DayRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_DayDesire_DesireId",
                table: "DayDesire",
                column: "DesireId");

            migrationBuilder.CreateIndex(
                name: "IX_Option_DesireId",
                table: "Option",
                column: "DesireId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DayDesire");

            migrationBuilder.DropTable(
                name: "Option");

            migrationBuilder.DropTable(
                name: "DayRecords");

            migrationBuilder.DropTable(
                name: "Desires");
        }
    }
}
