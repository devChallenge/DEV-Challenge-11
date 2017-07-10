using System.Collections.Generic;
using CallCanterSystem.BLL.DTOs;
using CallCenterSystem.Data.Entities.Generated;

namespace CallCanterSystem.BLL.Managers.Interfaces
{
    public interface IAreaManager
    {
        List<Area> GetAreasByName(List<string> areaNames);
        List<Area> GetAll();

        /// <summary>
        /// Add new area to system
        /// </summary>
        /// <returns>Wrapper where you will see success or no and error</returns>
        ResponseWrapper<Area> AddArea(string areaName);
    }
}