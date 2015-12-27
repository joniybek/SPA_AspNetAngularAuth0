using System.Web.Http;
using ShipmentsAPI.Models;
using System;
using ShipmentsAPI.DAO;
using ShipmentsAPI.DB;
using System.Linq;

namespace ShipmentsAPI.Controllers
{
    [Authorize]
    public class ScrapsController : ApiController
    {
        private static MyDbContext db = new MyDbContext();
     
        [AllowAnonymous]
        public IHttpActionResult GetAll()
        {           
        return Ok(db.Scraps);
        }
        [HttpGet]
        public IHttpActionResult Get(string id)
            {
            if ("new".Equals(id))
            {
                Scrap scrap = new Scrap();
                scrap.Name = "new product";
                return Ok(scrap);
            }
            return Ok(db.Scraps.Find(Int32.Parse(id)));
            }
            
        [HttpPost]
        public IHttpActionResult Post(Scrap scrap)
        {
            System.Diagnostics.Debug.WriteLine(scrap.Name);
            db.Scraps.Add(scrap);
            db.SaveChanges();
            return Ok(scrap);
        }

        [HttpDelete]
        public IHttpActionResult Delete(Scrap scrap)
        {
                db.Scraps.Remove(scrap);
                db.SaveChanges();

            return Ok(scrap);
        }

        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult GetByQuery(string query)
            {
            return Ok(db.Scraps
                        .SqlQuery("select * from Scrap where name LIKE '%" + query
                        + "%' or description LIKE '%" + query +"%'" )
                        .ToList<Scrap>());

        }


        [HttpGet]
        [AllowAnonymous]
        public IHttpActionResult GetTypeAhead(string query)
        {
                return Ok(db.Database
                        .SqlQuery<string>("select distinct search from (select substring_index(s.name, ' ', 1) search " +
                        "from aspnettest.Scrap s where s.name like '%" + query + "%' or s.description like '%" +
                        query + "%'union all select substring(substring_index(s.name, ' ', 2)," +
                        " length(substring_index(s.name, ' ', 2 - 1)) + 1) search from aspnettest.Scrap s " +
                        " where s.name like '%" + query + "%' or s.description like '%" + query + "%') o where search!=' '").ToList<string>()
                        );

            
        }

    }
}
