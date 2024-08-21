using data.Concrate;
using dto.dtos.AppUserDtos;
using entity.Concrate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace web.Areas.Admin.Controllers
{
	[Area("Admin")]
	[Authorize(Roles = "ADMIN")]
	public class ProfileController : Controller
	{
		private readonly UserManager<AppUser> _userManager;

		public ProfileController(Context context, UserManager<AppUser> userManager)
		{
			_userManager = userManager;
		}
		[HttpGet]
		public async Task<IActionResult> Index()
		{
			ViewBag.Title = "Profil";
			var values = await _userManager.FindByNameAsync(User.Identity.Name);
			AppUserEditDto appUserEditDto = new AppUserEditDto();
			appUserEditDto.Name = values.Name;
			appUserEditDto.Surname = values.Surname;
			appUserEditDto.Phone = values.PhoneNumber;
			appUserEditDto.UserName = values.UserName;
			return View(appUserEditDto);
		}
		[HttpPost]
		public async Task<IActionResult> Index(AppUserEditDto appUserEditDto)
		{
			if (appUserEditDto.Password == appUserEditDto.ConfirmPassword)
			{
				var user = await _userManager.FindByNameAsync(User.Identity.Name);
				user.Name = appUserEditDto.Name;
				user.Surname = appUserEditDto.Surname;
				user.UserName = appUserEditDto.UserName;
				user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, appUserEditDto.Password);
				var result = await _userManager.UpdateAsync(user);
				if (result.Succeeded)
				{
					return RedirectToAction("Index", "Admin");
				}
				else
				{
					foreach (var item in result.Errors)
					{
						ModelState.AddModelError("", item.Description);
					}
				}
			}
			return View();
		}
	}
}
