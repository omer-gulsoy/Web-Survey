using entity.Concrate;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
	public class SurveyQuestion
	{
		[Key]
		public int SurveyQuestion_Id { get; set; }
		public string? Description { get; set; }
		// 0 -> Kısa Yanıt
		// 1 -> Paragraf
		// 2 -> Çoktan Seçmeli
		// 3 -> Dosya Yükle
		// 4 -> Onay Kutusu
		// 5 -> Açılır Menü
		// 6 -> Tarih
		// 7 -> Saat
		// 8 -> Tarih ve Saat
		public int Style { get; set; }
		public int? Queue { get; set; }
		public bool Status { get; set; }
		public List<SurveyAnswer>? SurveyAnswers { get; set; }
		public List<SurveyOption>? surveyOptions { get; set; }
		[ForeignKey("Survey")]
		public int Survey_Id { get; set; }
		public Survey? Survey { get; set; }
	}
}
