using ShipmentsAPI.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace ShipmentsAPI.DB
{
    public class MyDbContext : DbContext
    {
        static string cs = "";

        public MyDbContext() : base("DefaultConnection")
        {
            Database.SetInitializer<MyDbContext>(new MyDbInitializer());
        }
        
        public DbSet<Scrap> Scraps { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}