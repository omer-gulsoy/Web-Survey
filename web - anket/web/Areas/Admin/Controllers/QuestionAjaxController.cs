using data.Concrate;
using Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace web.Areas.Admin.Controllers
{
	[Area("Admin")]
	[Authorize(Roles = "ADMIN")]
	public class QuestionAjaxController : Controller
	{
		private readonly Context _context;

		public QuestionAjaxController(Context context)
		{
			_context = context;
		}
		public IActionResult Index()
		{
			ViewBag.Surveys=_context.Surveys.ToList();
			return View();
		}
		//Create
		[HttpPost]
		public IActionResult CreateQuestion(SurveyQuestion question)
		{
			_context.SurveyQuestions.Add(question);
			_context.SaveChanges();
			var values = JsonConvert.SerializeObject(question);
			return Json(values);
		}
		// Read
		public async Task<IActionResult> ReadQuestion(int? Survey_Id)
		{
			List<SurveyQuestion> questions;

			if (Survey_Id.HasValue)
			{
				questions = await _context.SurveyQuestions
										  .Where(q => q.Survey_Id == Survey_Id.Value)
										  .ToListAsync();
			}
			else
			{
				questions = await _context.SurveyQuestions.ToListAsync();
			}

			return Json(questions);
		}


		// Question detaylarını getiren metod
		public IActionResult GetQuestionDetails(int id)
		{
			var question = _context.SurveyQuestions.Find(id);
			var values = question;
			return Json(values);
		}

		//Update
		public IActionResult UpdateQuestion(SurveyQuestion q)
		{
			var r = _context.SurveyQuestions.Find(q.SurveyQuestion_Id);
			r.SurveyQuestion_Id = q.SurveyQuestion_Id;
			r.Description = q.Description;
			r.Style = q.Style;
			r.Status = q.Status;
			r.Survey_Id = q.Survey_Id;
			_context.SaveChanges();
			var values = JsonConvert.SerializeObject(q);
			return Json(values);
		}
		//Delete
		public IActionResult DeleteQuestion(int id)
		{
			var willBeDeleted = _context.SurveyQuestions.Find(id);
			_context.SurveyQuestions.Remove(willBeDeleted);
			_context.SaveChanges();
			return NoContent();
		}
	}
}
