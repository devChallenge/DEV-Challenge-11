using System.Collections.Generic;
using CallCenterSystem.Data.Entities.Generated;

namespace CallCanterSystem.BLL.Managers.Interfaces
{
    public interface IEmployeeRegisterManager
    {
        /// <summary>
        /// Register employee in system and assigns areas
        /// </summary>
        /// <param name="areaNames">areas</param>
        Employee Register(string employeeName, 
                          List<string> areaNames);

        /// <summary>
        /// Reset all employees. This happens at the end of working day
        /// </summary>
        /// <returns>true/false which indicates success</returns>
        bool Reset();
    }
}