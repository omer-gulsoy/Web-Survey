using data.Concrate;
using entity.Concrate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace web.Areas.Admin.Controllers
{
	[Area("Admin")]
	[Authorize(Roles = "ADMIN")]
	public class OptionAjaxController : Controller
	{
		private readonly Context _context;

		public OptionAjaxController(Context context)
		{
			_context = context;
		}

		public IActionResult Index(int? SurveyQuestion_Id)
		{
			ViewBag.Surveys = _context.Surveys.OrderBy(s => s.Name).ToList();
			ViewBag.Questions = _context.SurveyQuestions.Where(x => x.Style == 2 || x.Style == 4 || x.Style == 5).OrderBy(q => q.Description).ToList();
			var degerler = _context.SurveyOptions.Where(o => o.SurveyQuestion_Id == SurveyQuestion_Id).OrderBy(o => o.Option).ToList();
			return View(degerler);
		}
		//Create
		[HttpPost]
		public IActionResult CreateOption(SurveyOption o)
		{
			//option.Status = true;
			_context.SurveyOptions.Add(o);
			_context.SaveChanges();
			var values = JsonConvert.SerializeObject(o);
			return Json(values);
		}
		// Read
		public async Task<IActionResult> ReadOption(int? SurveyQuestion_Id)
		{
			var optionsQuery = _context.SurveyOptions.AsQueryable();

			if (SurveyQuestion_Id.HasValue)
			{
				optionsQuery = optionsQuery.Where(o => o.SurveyQuestion_Id == SurveyQuestion_Id.Value);
			}

			var values = await optionsQuery.ToListAsync();
			return Json(values);
		}

		// Option detaylarını getiren metod
		public IActionResult GetOptionDetails(int id)
		{
			var option = _context.SurveyOptions.Find(id);
			var values = option;
			return Json(values);
		}
		//Update
		public IActionResult UpdateOption(SurveyOption newOption)
		{
			var oldOption = _context.SurveyOptions.Find(newOption.SurveyOption_Id);
			oldOption.SurveyOption_Id = newOption.SurveyOption_Id;
			oldOption.Option = newOption.Option;
			oldOption.SurveyQuestion_Id = newOption.SurveyQuestion_Id;
			oldOption.Status = newOption.Status;
			_context.SaveChanges();
			var values = JsonConvert.SerializeObject(newOption);
			return Json(values);
		}
		//Delete
		public IActionResult DeleteOption(int id)
		{
			var willBeDeleted = _context.SurveyOptions.Find(id);
			_context.SurveyOptions.Remove(willBeDeleted);
			_context.SaveChanges();
			return NoContent();
		}
	}
}
