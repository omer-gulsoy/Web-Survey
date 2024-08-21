using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
	public class SurveyAnswer
	{
		[Key]
		public int SurveyAnswer_Id { get; set; }
		public string? Answer { get; set; }
		[ForeignKey("SurveyQuestion")]
		public int SurveyQuestion_Id { get; set; }
		public SurveyQuestion? SurveyQuestion { get; set; }
	}
}
