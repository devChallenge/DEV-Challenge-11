using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CallCenterSystem.Data.Entities.Generated
{
    public class EmployeeArea : EntityBase
    {
        [Key]
        [Column(Order =  0)]
        public Guid EmployeeGuid { get; set; }
        
        [Key]
        [Column(Order = 1)]
        public string AreaName { get; set; }

        public virtual Area Area { get; set; }
        public virtual Employee Employee { get; set; }
    }
}