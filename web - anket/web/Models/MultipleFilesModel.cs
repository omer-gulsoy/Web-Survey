using System.ComponentModel.DataAnnotations;

namespace web.Models
{
	public class MultipleFilesModel:ResponseModel
	{
		[Required(ErrorMessage ="Lütfen Dosya Seçiniz")]
		public List<IFormFile>? Files { get; set; }
	}
}
