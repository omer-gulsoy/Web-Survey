using data.Concrate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace web.Areas.Admin.Controllers
{
	[Area("Admin")]
	[Authorize(Roles = "ADMIN")]
	public class StatisticController : Controller
	{
		Context Context = new Context();
		[HttpGet]
		public IActionResult Index()
		{
			ViewBag.Title = "İstatistik";
			ViewBag.Surveys = Context.Surveys.ToList();
			ViewBag.SurveyQuestions = Context.SurveyQuestions.ToList();
			ViewBag.SurveyOptions = Context.SurveyOptions.ToList();
			var answers = Context.SurveyAnswers.ToList();
			return View(answers);
		}


		//Read
		public async Task<IActionResult> ReadAnswer()
		{
			var answers = await Context.SurveyAnswers.ToListAsync();
			return Json(answers);
		}
	}
}
