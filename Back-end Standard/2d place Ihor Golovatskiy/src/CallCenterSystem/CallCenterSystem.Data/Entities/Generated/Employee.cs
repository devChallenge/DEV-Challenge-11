using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CallCenterSystem.Data.Entities.Generated
{
    public partial class Employee : EntityBase
    {
        public Employee()
        {
            EmployeeAreas = new HashSet<EmployeeArea>();
        }

        [Key]
        public Guid EmployeeGuid { get; set; }

        public string Name { get; set; }

        /// <summary>
        /// Indicates if employee is currently on his work place
        /// </summary>
        public bool IsActive { get; set; }

        public virtual ICollection<EmployeeArea> EmployeeAreas { get; set; }

        public EmployeeAvailability EmployeeAvailability { get; set; }
    }
}
