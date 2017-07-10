using System.Collections.Generic;
using CallCenterSystem.Data.Entities.Generated;

namespace CallCanterSystem.BLL.Managers.Interfaces
{
    public interface IEmployeeManager
    {
        Employee GetEmployee(string employeeName);

        Employee SaveNewEmployee(string employeeName, List<Area> areas);

        Employee UpdateEmployeeAreas(Employee employee, List<Area> areas);

        List<Employee> GetActiveAvailableEmployees(List<string> area);
    }
}