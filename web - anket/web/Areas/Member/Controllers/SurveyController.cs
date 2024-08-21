using data.Concrate;
using entity.Concrate;
using Entity;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using web.Models;

namespace web.Areas.Member.Controllers
{
	[Area("Member")]
	public class SurveyController : Controller
	{
		Context Context = new Context();
		AppUser AppUser = new AppUser();

		[HttpGet]
		public IActionResult Index()
		{
			var degerler = Context.Surveys.OrderBy(d=>d.Name).ToList();
			return View(degerler);
		}
		[HttpGet]
		public IActionResult SurveyGet(int id)
		{
			ViewBag.SurveyQuestions = Context.SurveyQuestions
				.Where(x => x.Survey_Id == id)
				.OrderBy(x => x.Queue)
				.ToList();
			ViewBag.SurveyOptions = Context.SurveyOptions.ToList();
			var title = Context.Surveys.Where(s => s.Survey_Id == id).Select(s => s.Name);
			ViewBag.Name = title;
			return View();
		}
		[HttpPost]
		public IActionResult SurveyGet(List<SurveyAnswer> surveyAnswers)
		{
			Context.SurveyAnswers.AddRange(surveyAnswers);
			Context.SaveChanges();


			MimeMessage mimeMessage = new MimeMessage();
			MailboxAddress mailboxAddressFrom = new MailboxAddress("Anket", "o.hasan.41.41@gmail.com");
			MailboxAddress mailboxAddressTo = new MailboxAddress("Admin", "omerhasangulsoy@hotmail.com");
			mimeMessage.From.Add(mailboxAddressFrom);
			mimeMessage.To.Add(mailboxAddressTo);
			var bodyBuilder = new BodyBuilder();
			bodyBuilder.TextBody = "Anketinize yeni katılım var! Cevapları görüntülemek için lütfen tıklayınız. https://localhost:44356/Login/Index";
			mimeMessage.Body = bodyBuilder.ToMessageBody();
			mimeMessage.Subject = "Anketinize yeni katılım var!";
			SmtpClient client = new SmtpClient();
			client.Connect("smtp.gmail.com", 587, false);
			client.Authenticate("o.hasan.41.41@gmail.com", "yozfoplcxhvdokjj");
			client.Send(mimeMessage);
			client.Disconnect(true);
			return RedirectToAction("Thanks", "Survey", new { area = "Member" });
		}
		[HttpGet]
		public IActionResult Thanks()
		{
			return View();
		}
		[HttpPost]
		public IActionResult Upload([FromForm] SingleFileModel model)
		{
			if (ModelState.IsValid)
			{
				model.isResponse = true;
				string path = Path.Combine(Directory.GetCurrentDirectory(), "/wwwroot/Files");
				if (!Directory.Exists(path))
				{
					Directory.CreateDirectory(path);
				}
				FileInfo fileInfo = new FileInfo(model.File.FileName);
				string fileName = model.FileName + fileInfo.Extension;
				string fileNameWithPath = Path.Combine(path, fileName);
				using (var stream = new FileStream(fileNameWithPath, FileMode.Create))
				{
					model.File.CopyTo(stream);
				}
				model.isSuccess = true;
				model.message = "Başarılı";
				return Ok(new { message = "Dosya başarıyla yüklendi." });
			}
			return BadRequest(new { message = "Dosya yükleme başarısız." });
		}
	}
}
