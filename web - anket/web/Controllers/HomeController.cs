using data.Concrate;
using Entity;
using Microsoft.AspNetCore.Mvc;

namespace web.Controllers
{
	public class HomeController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
		public IActionResult Error(int code)
		{
			return View();
		}
	}
}
