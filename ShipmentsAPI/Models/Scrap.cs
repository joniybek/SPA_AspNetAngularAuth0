using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ShipmentsAPI.Models
{
    public class Scrap
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string Source { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public string Price { get; set; }
        public string Name { get; set; }
    }
}