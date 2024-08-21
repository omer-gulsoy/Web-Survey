using System.ComponentModel.DataAnnotations;

namespace web.Models
{
	public class SingleFileModel : ResponseModel
	{
		[Required(ErrorMessage = "Lütfen Dosya Yükleyiniz")]
		public string? FileName { get; set; }
		[Required(ErrorMessage = "Lütfen Dosya Seçiniz")]
		public IFormFile? File { get; set; }//IFormFile
	}
}
