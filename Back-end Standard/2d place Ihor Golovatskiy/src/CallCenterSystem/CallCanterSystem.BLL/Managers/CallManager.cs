using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CallCanterSystem.BLL.Managers.Interfaces;
using CallCenterSystem.Data;
using CallCenterSystem.Data.Entities.Generated;
using CallCenterSystem.UTILS.Extensions;
using Castle.Core.Internal;

namespace CallCanterSystem.BLL.Managers
{
    public class CallManager : ICallManager
    {
        #region Properties

        private readonly IEmployeeManager _employeeManager;

        #endregion

        #region Contructors

        public CallManager(IEmployeeManager employeeManager)
        {
            _employeeManager = employeeManager;
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Register call
        /// since we doesn't sort call Areas list and calls list it guarantees items order,
        /// but in future best choice will use queue
        /// </summary>
        /// <param name="callAreas"></param>
        /// <returns></returns>
        public List<Call> RegisterCalls(List<string> callAreas)
        {
            var calls = new List<Call>();

            if (callAreas.IsNullOrEmpty())
            {
                return calls;
            }

            //Get all available employees
            var employeesWithNeededArea = _employeeManager.GetActiveAvailableEmployees(callAreas);
            var assignedEmployees = new List<Employee>();

            foreach (var area in callAreas)
            {
                //Find available employeer
                var assignedEmployee = FindAppropriateEmployee(employeesWithNeededArea,
                                                               assignedEmployees,
                                                               callAreas,
                                                               area);

                if (assignedEmployee != null)
                {
                    var call = new Call()
                    {
                        CallGuid = Guid.NewGuid(),
                        AreaName = area,
                        Employee = assignedEmployee,
                        EmployeeGuid = assignedEmployee.EmployeeGuid
                    };

                    calls.Add(call);
                    assignedEmployees.Add(assignedEmployee);
                }
            }

            //Save calls in database
            SaveCallsAndAssignedEmployees(calls,
                                          assignedEmployees);

            return calls;
        }

        #endregion

        #region Private Methods

        /// <summary>
        /// Return the most specific employeer. It will allow to have more clients
        /// </summary>
        /// <param name="availablEmployees">currently available employees</param>
        /// <param name="alreadyAssignedEmployees">employees that already was assigned</param>
        private Employee FindAppropriateEmployee(List<Employee> availablEmployees, 
                                                 List<Employee> alreadyAssignedEmployees,
                                                 List<string> areas,
                                                 string area)
        {
            //Employeer should have needed area, and should be available
            //We always select employyer with minimum count of his areas
            var theMostSpecificEmployees = availablEmployees.Where(e => !alreadyAssignedEmployees.Any(ee => ee.EmployeeGuid.Equals(e.EmployeeGuid))
                                                                        && e.Areas.Any(a => a.Name.Equals(area)))
                                                            .OrderBy(e => e.Areas.Count)
                                                            .ToList();

            var minCount = int.MaxValue;
            Employee theBestSuitablEmployee = null;
            foreach (var theMostSpecificEmployee in theMostSpecificEmployees)
            {
                //Count how many other calls that are in queue can handle this employee
                //We should choose employee which handles minimum areas (in compare with other employees) 
                //and that can't handle other calls which are in queue

                //Count - how many calls it can handle except this call
                var count = areas.Count(a => !a.Equals(area) 
                                             && theMostSpecificEmployee.Areas.Any(aa => aa.Name.Equals(a)));

                if (minCount > count)
                {
                    minCount = count;
                    theBestSuitablEmployee = theMostSpecificEmployee;
                }
            }

            return theBestSuitablEmployee;
        }

        /// <summary>
        /// Save calls and assigned employees to database,
        /// employees become not available
        /// </summary>
        private void SaveCallsAndAssignedEmployees(List<Call> calls,
                                                   List<Employee> assignedEmployees)
        {
            using (var dbContext = new CallSystemDbContext())
            {
                dbContext.Calls.AddRange(calls);

                foreach (var assignedEmployee in assignedEmployees)
                {
                    // need more time ((
                    //var employee = (from x in dbContext.Employees.Include(e => e.EmployeeAvailability)
                    //                    where x.EmployeeGuid == assignedEmployee.EmployeeGuid
                    //                    select x).FirstOrDefault();
                    ////var availability = dbContext.EmployeeAvailabilities.FirstOrDefault(ea => ea.EmployeeGuid.Equals(assignedEmployee.EmployeeGuid));

                    //if (employee== null)
                    //{
                    //    continue;
                    //}

                    //employee.EmployeeAvailability.IsAvailable = false;
                }

                try
                {
                    dbContext.SaveChanges();
                }
                catch (Exception e)
                {
                    
                }
            }
        }

        #endregion
    }
}
