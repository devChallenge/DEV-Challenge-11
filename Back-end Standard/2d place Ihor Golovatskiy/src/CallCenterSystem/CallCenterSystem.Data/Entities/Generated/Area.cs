using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CallCenterSystem.Data.Entities.Generated
{
    public class Area : EntityBase
    {
        [Key]
        public string Name { get; set; }
        
        public virtual ICollection<EmployeeArea> EmployeeAreas { get; set; }
    }
}