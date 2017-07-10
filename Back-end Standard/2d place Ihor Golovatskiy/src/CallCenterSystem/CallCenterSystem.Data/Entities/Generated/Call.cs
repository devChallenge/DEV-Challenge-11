using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CallCenterSystem.Data.Entities.Generated
{
    public class Call : EntityBase
    {
        [Key]
        public Guid CallGuid { get; set; }

        public Guid EmployeeGuid { get; set; }

        public string AreaName { get; set; }

        [ForeignKey("EmployeeGuid")]
        public virtual Employee Employee { get; set; }

        [ForeignKey("AreaName")]
        public virtual Area Area { get; set; }
    }
}