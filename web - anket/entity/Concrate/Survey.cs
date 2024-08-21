using Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace entity.Concrate
{
	public class Survey
	{
		[Key]
		public int Survey_Id { get; set; }
		public string? Name { get; set; }
		public string? Description { get; set; }
		public bool Status { get; set; }
		public List<SurveyQuestion>? SurveyQuestions { get; set; }
	}
}
