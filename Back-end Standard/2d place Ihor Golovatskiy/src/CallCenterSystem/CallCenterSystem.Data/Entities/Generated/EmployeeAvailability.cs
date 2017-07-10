using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CallCenterSystem.Data.Entities.Generated
{
    public class EmployeeAvailability
    {
        [Key]
        public Guid EmployeeGuid { get; set; }

        public bool IsAvailable { get; set; }

        public Employee Employee { get; set; }
    }
}