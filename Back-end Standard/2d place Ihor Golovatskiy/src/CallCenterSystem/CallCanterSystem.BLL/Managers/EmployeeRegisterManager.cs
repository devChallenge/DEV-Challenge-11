using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CallCanterSystem.BLL.Managers.Interfaces;
using CallCenterSystem.Data;
using CallCenterSystem.Data.Entities.Generated;

namespace CallCanterSystem.BLL.Managers
{
    public class EmployeeRegisterManager : IEmployeeRegisterManager
    {
        #region Properties

        private readonly IAreaManager _areaManager;
        private readonly IEmployeeManager _employeeManager;
        
        #endregion

        #region Contructors

        public EmployeeRegisterManager(IAreaManager areaManager,
                                       IEmployeeManager employeeManager)
        {
            _areaManager = areaManager;
            _employeeManager = employeeManager;
        }

        #endregion

        #region Public Methods
        
        /// <summary>
        /// Register employee in system and assigns areas
        /// </summary>
        /// <param name="areaNames">areas</param>
        public Employee Register(string employeeName, 
                                 List<string> areaNames)
        {
            var areas = _areaManager.GetAreasByName(areaNames);
            var employee = _employeeManager.GetEmployee(employeeName);

            if (employee != null)
            {
                employee = _employeeManager.UpdateEmployeeAreas(employee, areas);
            }
            else
            {
                employee = _employeeManager.SaveNewEmployee(employeeName, areas);
            }

            return employee;
        }

        /// <summary>
        /// Reset all employees. This happens at the end of working day
        /// </summary>
        /// <returns>true/false which indicates success</returns>
        public bool Reset()
        {
            try
            {
                using (var dbContext = new CallSystemDbContext())
                {
                    var employees = (from e in dbContext.Employees
                                    where e.IsActive
                                    select e).ToList();

                    employees.ForEach(e => e.IsActive = false);

                    dbContext.SaveChanges();
                }

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        #endregion

        #region Private Methods
        
        #endregion

    }
}
