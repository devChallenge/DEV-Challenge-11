using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CallCenterSystem.Data.Entities.Generated;

namespace CallCenterSystem.Data.Seed
{
    public class CallSystemDbInitializer : CreateDatabaseIfNotExists<CallSystemDbContext>
    {
        protected override void Seed(CallSystemDbContext context)
        {
            IList<Area> defaultStandards = new List<Area>();

            defaultStandards.Add(new Area() { Name = "bills"});
            defaultStandards.Add(new Area() { Name = "contracts" });
            defaultStandards.Add(new Area() { Name = "special-offers"});
            defaultStandards.Add(new Area() { Name = "leases"});

            foreach (var area in defaultStandards)
            {
                context.Areas.Add(area);
            }

            base.Seed(context);
        }
    }
}
