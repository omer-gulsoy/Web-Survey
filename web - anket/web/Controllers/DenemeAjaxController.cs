using Microsoft.AspNetCore.Mvc;
using web.Models;

namespace web.Controllers
{
    [Area("Member")]
	public class DenemeAjaxController : Controller
	{
		public IActionResult Index()
		{
			SingleFileModel model = new SingleFileModel();
			return View(model);
		}
        [HttpPost]
        public IActionResult Upload([FromForm] SingleFileModel model)
        {
            if (ModelState.IsValid)
            {
                model.isResponse = true;
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Files");
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
