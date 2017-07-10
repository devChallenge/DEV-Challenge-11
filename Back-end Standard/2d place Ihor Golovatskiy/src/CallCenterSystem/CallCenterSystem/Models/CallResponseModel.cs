using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CallCenterSystem.Data.Entities.Generated;

namespace CallCenterSystem.WebApi.Models
{
    public class CallResponseModel
    {
        public int TotalAssignments { get { return Calls.Count(c => !string.IsNullOrEmpty(c.EmployeeGuid));  } }
        public List<CallModel> Calls { get; set; }

        public CallResponseModel()
        {
            Calls = new List<CallModel>();
        }

        public void Build(List<Call> assignedCalls, 
                          List<string> areas)
        {
            var acceptedCallGuids = new List<Guid>();

            foreach (var area in areas)
            {
                var acceptedCall = assignedCalls.FirstOrDefault(c => c.AreaName.Equals(area) 
                                                                     && !acceptedCallGuids.Contains(c.CallGuid));

                //if call was not accepted
                if (acceptedCall == null)
                {
                    Calls.Add(new CallModel()
                    {
                        AreaName = area
                    });
                }
                else
                {
                    acceptedCallGuids.Add(acceptedCall.CallGuid);
                    Calls.Add(new CallModel()
                    {
                        CallGuid = acceptedCall.CallGuid.ToString(),
                        AreaName = area,
                        EmployeeGuid = acceptedCall.EmployeeGuid.ToString(),
                        EmployeeName = acceptedCall.Employee.Name,
                    });
                }
            }
        }

    }

    public class CallModel
    {
        public string CallGuid { get; set; }
        public string AreaName { get; set; }
        public string EmployeeGuid { get; set; }
        public string EmployeeName { get; set; }
    }
}