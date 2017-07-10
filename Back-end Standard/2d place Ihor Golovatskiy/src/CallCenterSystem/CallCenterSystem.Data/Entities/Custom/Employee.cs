using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CallCenterSystem.Data.Entities.Generated
{
    public partial class Employee
    {
        [NotMapped]
        public List<Area> Areas
        {
            get
            {
                return EmployeeAreas.Where(ea => ea.Area != null)
                                    .Select(ea => ea.Area)
                                    .ToList();
            }
        }

        public bool IsAvailable
        {
            get { return EmployeeAvailability.IsAvailable; }
        }
    }
}
