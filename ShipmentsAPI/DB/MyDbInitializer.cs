using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ShipmentsAPI.DB
{
    public class MyDbInitializer : CreateDatabaseIfNotExists<MyDbContext>
    {
        protected override void Seed(MyDbContext context)
        {
       
            context.Scraps.Add(new Models.Scrap { ID = 1,Source="1a.lv", Description = "this is nice notebook", Picture = "some location",Price = "100" ,Name = "Asus laptop" });
            context.Scraps.Add(new Models.Scrap { ID = 2, Source = "rdVeikals", Description = "this is nice notebook", Picture = "some location", Price = "200", Name = "Toshiba laptop" });
            context.Scraps.Add(new Models.Scrap { ID = 3, Source = "1a.lv", Description = "this is nice notebook", Picture = "some location", Price = "300", Name = "Dell laptop" });
            context.Scraps.Add(new Models.Scrap { ID = 4,Source="1a.lv", Description = "this is nice notebook", Picture = "some location",Price = "400" ,Name = "Apple laptop" });
            ///context.SaveChanges();
            base.Seed(context);

   
        }
    }
}