using entity.Concrate;
using Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Concrate
{
	public class Context : IdentityDbContext<AppUser, AppRole, int>
	{
		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlServer("server=ELITEBOOK\\MSSQLSERVER2012;database=AnketDB;integrated security=true");

		}
		public DbSet<SurveyQuestion>? SurveyQuestions { get; set; }
		public DbSet<SurveyAnswer>? SurveyAnswers { get; set; }
		public DbSet<SurveyOption>? SurveyOptions { get; set; }
        public DbSet<Survey>? Surveys { get; set; }
    }
}
