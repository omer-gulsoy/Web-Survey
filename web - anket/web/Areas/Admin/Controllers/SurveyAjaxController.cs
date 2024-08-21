using Microsoft.AspNetCore.Mvc;
using web.Areas.Admin.Models;
using Newtonsoft.Json;
using data.Concrate;
using Microsoft.EntityFrameworkCore;
using entity.Concrate;
using Microsoft.AspNetCore.Authorization;

namespace web.Areas.Admin.Controllers
{
	[Area("Admin")]
	[Authorize(Roles = "ADMIN")]
	public class SurveyAjaxController : Controller
	{
		private readonly Context _context;

		public SurveyAjaxController(Context context)
		{
			_context = context;
		}
		public IActionResult Index()
		{
			return View();
		}
		//Create
		[HttpPost]
		public IActionResult CreateSurvey(Survey survey)
		{
			//survey.Status = true;
			_context.Surveys.Add(survey);
			_context.SaveChanges();
			var values = JsonConvert.SerializeObject(survey);
			return Json(values);
		}
		//Read
		public async Task<IActionResult> ReadSurvey()
		{
			var surveys = await _context.Surveys.OrderBy(s=>s.Name).ToListAsync();
			return Json(surveys);
		}

		// Survey detaylarını getiren metod
		public IActionResult GetSurveyDetails(int id)
		{
			var survey = _context.Surveys.Find(id);
			var values = survey;
			return Json(values);
		}

		//Update
		public IActionResult UpdateSurvey(Survey newSurvey)
		{
			var oldSurvey = _context.Surveys.Find(newSurvey.Survey_Id);
			oldSurvey.Survey_Id = newSurvey.Survey_Id;
			oldSurvey.Name = newSurvey.Name;
			oldSurvey.Description = newSurvey.Description;
			oldSurvey.Status = newSurvey.Status;
			_context.SaveChanges();
			var values = JsonConvert.SerializeObject(newSurvey);
			return Json(values);
		}
		//Delete
		public IActionResult DeleteSurvey(int id)
		{
			var willBeDeleted = _context.Surveys.Find(id);
			_context.Surveys.Remove(willBeDeleted);
			_context.SaveChanges();
			return NoContent();
		}
	}
}
