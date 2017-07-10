using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using CallCanterSystem.BLL.Managers.Interfaces;
using CallCenterSystem.Data;
using CallCenterSystem.Data.Entities.Generated;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;

namespace CallCanterSystem.BLL.Managers
{
    public class EmployeeManager : IEmployeeManager
    {
        #region Contructors
        #endregion

        #region Public Methods
       
        public Employee GetEmployee(string employeeName)
        {
            using (var dbContext = new CallSystemDbContext())
            {
                return (from x in AddDefaultPrefetchPath(dbContext.Employees)
                        where x.Name == employeeName
                        select x).FirstOrDefault();
            }
        }
        
        public Employee SaveNewEmployee(string employeeName, List<Area> areas)
        {
            using (var dbContext = new CallSystemDbContext())
            {
                var employeeGuid = Guid.NewGuid();
                var newEmployee = new Employee()
                {
                    EmployeeGuid = employeeGuid,
                    Name = employeeName,
                    IsActive = true,
                };
                //new employee is always available after registration
                newEmployee.EmployeeAvailability = new EmployeeAvailability()
                {
                    Employee = newEmployee,
                    EmployeeGuid = employeeGuid,
                    IsAvailable = true
                };

                var employeeAreas = areas.Select(area => new EmployeeArea()
                                                         {
                                                             Area = dbContext.Areas.Find(area.Name),
                                                             AreaName = area.Name,
                                                             EmployeeGuid = employeeGuid,
                                                             Employee = newEmployee
                                                         })
                                         .ToList();
                dbContext.Employees.Add(newEmployee);
                dbContext.EmployeesAreas.AddRange(employeeAreas);
                dbContext.SaveChanges();

                return newEmployee;
            }
        }

        public Employee UpdateEmployeeAreas(Employee employee, List<Area> areas)
        {
            using (var dbContext = new CallSystemDbContext())
            {
                employee = (from x in dbContext.Employees.Include(e => e.EmployeeAreas.Select(ea => ea.Area))
                                                      .Include(e => e.EmployeeAvailability)
                            where x.Name == employee.Name
                            select x).FirstOrDefault();
                employee.IsActive = true;
                employee.EmployeeAvailability.IsAvailable = true;

                //Add new areas to existing employee
                foreach (var area in areas)
                {
                    if (!employee.Areas.Any(a => a.Name.Equals(area.Name)))
                    {
                        employee.EmployeeAreas.Add(new EmployeeArea()
                        {
                            AreaName = area.Name,
                            EmployeeGuid = employee.EmployeeGuid
                        });
                    }
                }

                //employee areas to unassign 
                var employeeAreasToUnassign = employee.EmployeeAreas.Where(ea => areas.All(a => a.Name != ea.AreaName))
                                                                    .ToList();


                dbContext.EmployeesAreas.RemoveRange(employeeAreasToUnassign);
                dbContext.SaveChanges();

                return employee;
            }
        }

        public List<Employee> GetActiveAvailableEmployees(List<string> area)
        {
            using (var dbContext = new CallSystemDbContext())
            {
                var employeesQuery = from x in dbContext.Employees
                                     join ea in dbContext.EmployeesAreas on x.EmployeeGuid equals ea.EmployeeGuid
                                     where x.IsActive
                                           && x.EmployeeAvailability.IsAvailable
                                           && area.Contains(ea.AreaName)
                                     select x;
                employeesQuery.Include(p => p.EmployeeAreas.Select(ea => ea.Area))
                              .Include(p => p.EmployeeAvailability).Load();
                return employeesQuery.ToList();
            }
        }

        #endregion

        #region Private Methods

        /// <summary>
        /// Add default prefetch path. ToDo: make this as extension method
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        private IQueryable<Employee> AddDefaultPrefetchPath(DbSet<Employee> path)
        {
            return path.Include(p => p.EmployeeAreas.Select(ea => ea.Area))
                       .Include(p => p.EmployeeAvailability);
        }

        #endregion
    }
}
