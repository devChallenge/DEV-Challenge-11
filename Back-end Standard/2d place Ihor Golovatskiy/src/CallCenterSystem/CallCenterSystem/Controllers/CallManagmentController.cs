using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CallCanterSystem.BLL.Managers.Interfaces;
using CallCenterSystem.Data.Entities.Generated;
using CallCenterSystem.UTILS.Extensions;
using CallCenterSystem.WebApi.Models;

namespace CallCenterSystem.WebApi.Controllers
{
    [RoutePrefix("CallManagement")]
    public class CallManagmentController : ApiController
    {
        #region Managers

        private readonly IEmployeeRegisterManager _employeeRegisterManager;
        private readonly ICallManager _callManager;

        #endregion

        public CallManagmentController(IEmployeeRegisterManager employeeRegisterManager,
                                       ICallManager callManager)
        {
            _employeeRegisterManager = employeeRegisterManager;
            _callManager = callManager;
        }

        [HttpGet]
        [Route("Register")]
        public HttpResponseMessage RegisterEmployee(string employeeName, 
                                                    [FromUri] string[] areas)
        {
            if (string.IsNullOrEmpty(employeeName)
                || areas.IsNullOrEmpty())
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Employee name is empty or no areas specified!");
            }

            _employeeRegisterManager.Register(employeeName, areas.ToList());

            return Request.CreateResponse(HttpStatusCode.OK, "Welcome");
        }

        [HttpGet]
        [Route("Call")]
        public CallResponseModel RegisterCall([FromUri] List<string> areas)
        {
            var assignedCalls = _callManager.RegisterCalls(areas);
            var model = new CallResponseModel();
            model.Build(assignedCalls,
                        areas);

            return model;
        }


        [HttpGet]
        [Route("Reset")]
        public bool Reset()
        {
            return _employeeRegisterManager.Reset();
        }
    }
}
