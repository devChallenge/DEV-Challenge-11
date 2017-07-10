using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CallCanterSystem.BLL.Managers.Interfaces;
using CallCenterSystem.Data.Entities.Generated;

namespace CallCenterSystem.WebApi.Controllers
{
    [RoutePrefix("Area")]
    public class AreasController : ApiController
    {
        private readonly IAreaManager _areaManager;

        public AreasController(IAreaManager areaManager)
        {
            _areaManager = areaManager;
        }

        [HttpGet]
        [Route("All")]
        public List<Area> GetAllAreas()
        {
            return _areaManager.GetAll();
        }

        [HttpGet]
        [Route("Add")]
        public HttpResponseMessage AddArea(string areaName)
        {
            if (string.IsNullOrEmpty(areaName))
            {
               return Request.CreateResponse(HttpStatusCode.BadRequest, "Employee name is empty or no areas specified!");
            }

            var result = _areaManager.AddArea(areaName);
            
            return result.IsSuccess 
                    ? Request.CreateResponse(HttpStatusCode.OK, "Saved")
                    : Request.CreateResponse(HttpStatusCode.BadRequest, result.ErrorMessage);
        }
    }
}
