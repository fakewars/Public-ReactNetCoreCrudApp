using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Design;

namespace DesiresAPI.BL
{
    public class AppDbContext : DbContext
    {
        public DbSet<Desire> Desires { get; set; }
        public DbSet<DayRecord> DayRecords { get; set; }

        public AppDbContext() {}

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseSqlServer(@"[CONNECTION STRINGS REDACTED]");
            //optionsBuilder.UseSqlServer(@"Server=(localdb)\ProjectsV13;Database=AppDb;Trusted_Connection=True;");
        }
    }
}
