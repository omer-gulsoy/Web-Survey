using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace data.Migrations
{
    public partial class Mig_E : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Survey_Id",
                table: "SurveyAnswers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SurveyAnswers_Survey_Id",
                table: "SurveyAnswers",
                column: "Survey_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SurveyAnswers_Surveys_Survey_Id",
                table: "SurveyAnswers",
                column: "Survey_Id",
                principalTable: "Surveys",
                principalColumn: "Survey_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SurveyAnswers_Surveys_Survey_Id",
                table: "SurveyAnswers");

            migrationBuilder.DropIndex(
                name: "IX_SurveyAnswers_Survey_Id",
                table: "SurveyAnswers");

            migrationBuilder.DropColumn(
                name: "Survey_Id",
                table: "SurveyAnswers");
        }
    }
}
