using System;
using System.Collections.Generic;
using System.Linq;
using CallCanterSystem.BLL.DTOs;
using CallCanterSystem.BLL.Managers.Interfaces;
using CallCenterSystem.Data;
using CallCenterSystem.Data.Entities.Generated;
using CallCenterSystem.UTILS.Extensions;

namespace CallCanterSystem.BLL.Managers
{
    public class AreaManager : IAreaManager
    {
        #region Contructors
        #endregion

        #region Public Methods

        /// <summary>
        /// Get areas by name. TODO: add cache support
        /// </summary>
        public List<Area> GetAreasByName(List<string> areaNames)
        {
            if (areaNames.IsNullOrEmpty())
            {
                return new List<Area>();
            }

            using (var dbContext = new CallSystemDbContext())
            {
                return (from x in dbContext.Areas
                        where areaNames.Contains(x.Name)
                        select x).ToList();
            }
        }

        /// <summary>
        /// Get all areas. TODO: add cache support
        /// </summary>
        public List<Area> GetAll()
        {
            using (var dbContext = new CallSystemDbContext())
            {
                return (from x in dbContext.Areas
                        select x).ToList();
            }
        }

        /// <summary>
        /// Add new area to system
        /// </summary>
        /// <returns>Wrapper where you will see success or no and error</returns>
        public ResponseWrapper<Area> AddArea(string areaName)
        {
            var result = new ResponseWrapper<Area>();

            try
            {
                if (GetAreasByName(new List<string> {areaName}).Count > 0)
                {
                    result.ErrorMessage = "Area already exists!";
                    return result;
                }

                using (var dbContext = new CallSystemDbContext())
                {
                    var newArea = new Area() {Name = areaName};
                    dbContext.Areas.Add(newArea);
                    dbContext.SaveChanges();

                    result.IsSuccess = true;
                    result.ResponseData = newArea;
                }
            }
            catch (Exception e)
            {
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        #endregion

        #region Private Methods
        #endregion
    }
}