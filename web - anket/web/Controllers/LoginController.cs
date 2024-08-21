using entity.Concrate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using web.Models;

namespace web.Controllers
{   
    public class LoginController : Controller
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        public LoginController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Index(LoginViewModel loginViewModel)
        {
            var result = await _signInManager.PasswordSignInAsync(loginViewModel.UserName, loginViewModel.Password, false, false);
            if (result.Succeeded)
            {
                return RedirectToAction("Index", "Home", new { area = "Admin" });
			}
			else
			{
				ModelState.AddModelError(string.Empty, "Girdiğiniz bilgi hatalı.");
				return View(loginViewModel);
			}
        }
    }
}
