using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace data.Migrations
{
    public partial class Mig_M : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Queue",
                table: "SurveyQuestions",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Queue",
                table: "SurveyQuestions");
        }
    }
}
