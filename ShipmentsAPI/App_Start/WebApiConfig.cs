using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using Newtonsoft.Json.Serialization;

namespace ShipmentsAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute("query", "query/scraps/{query}",
                new { controller = "Scraps" , action="GetByQuery", query = RouteParameter.Optional });

            config.Routes.MapHttpRoute("typeahead", "query/scraps/typeahead/{query}",
                new { controller = "Scraps", action = "GetTypeAhead", query = RouteParameter.Optional });


            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new {id = RouteParameter.Optional});



            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}