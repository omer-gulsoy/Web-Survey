using Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace entity.Concrate
{
	public class SurveyOption
	{
		[Key]
		public int SurveyOption_Id { get; set; }
        public string? Option { get; set; }
        [ForeignKey("SurveyQuestion")]
		public int? SurveyQuestion_Id { get; set; }
		public SurveyQuestion? SurveyQuestion { get; set; }
        public bool Status { get; set; }
    }
}
