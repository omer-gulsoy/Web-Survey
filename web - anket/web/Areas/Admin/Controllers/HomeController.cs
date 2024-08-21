using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace web.Areas.Admin.Controllers
{
	[Area("Admin")]
	[Authorize(Roles = "ADMIN")]
	public class HomeController : Controller
	{
		[Authorize]
		public IActionResult Index()
		{
			ViewBag.Title = "Ana Sayfa";
			return View();
		}
	}
}
