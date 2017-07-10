using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Diagnostics.Contracts;
using CallCenterSystem.Data.Entities;
using CallCenterSystem.Data.Entities.Generated;
using CallCenterSystem.Data.Seed;
using Castle.Core.Internal;

namespace CallCenterSystem.Data
{
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class CallSystemDbContext : DbContext
    {
        private DateTime TimeStamp { get; set; }
        // Your context has been configured to use a 'CallSystemDbContext' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'CallCenterSystem.Data.CallSystemDbContext' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'CallSystemDbContext' 
        // connection string in the application configuration file.
        public CallSystemDbContext()
            : base("name=CallSystemDbContext")
        {
            Database.SetInitializer(new CallSystemDbInitializer());
            TimeStamp = DateTime.Now;
            
        }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Area> Areas { get; set; }
        public virtual DbSet<EmployeeArea> EmployeesAreas { get; set; }
        public virtual DbSet<EmployeeAvailability> EmployeeAvailabilities { get; set; }
        public virtual DbSet<Call> Calls { get; set; }

        #region Overrided methods
        
        public override int SaveChanges()
        {
            var entities = ChangeTracker.Entries()
                                        .Where(e => e.State == EntityState.Modified
                                                    || e.State == EntityState.Added);

            foreach (var dbEntityEntry in entities)
            {
                var entity = dbEntityEntry.Entity as EntityBase;
                if (entity != null)
                {
                    SetAuditProperties(entity,
                                       dbEntityEntry.State);
                }
            }

            int result;
            try
            {
                result = base.SaveChanges();
            }
            //https://stackoverflow.com/questions/6819813/solution-for-store-update-insert-or-delete-statement-affected-an-unexpected-n
            catch (DbUpdateException ex)
            {
                ex.Entries.ForEach(e =>
                {
                    if (e.State == EntityState.Modified)
                    {
                        e.Reload();
                        e.OriginalValues.SetValues(e.GetDatabaseValues());
                    }
                });
                result = base.SaveChanges();
            }
            catch (Exception e)
            {
                result = 1;
            }
            return result;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            var conventions = new List<PluralizingTableNameConvention>().ToArray();
            modelBuilder.Conventions.Remove(conventions);

            modelBuilder.Entity<EmployeeArea>()
               .HasKey(c => new { c.EmployeeGuid, c.AreaName });

            modelBuilder.Entity<Area>()
                .HasMany(c => c.EmployeeAreas)
                .WithRequired()
                .HasForeignKey(c => c.AreaName);

            modelBuilder.Entity<Employee>()
                .HasMany(c => c.EmployeeAreas)
                .WithRequired()
                .HasForeignKey(c => c.EmployeeGuid);

            modelBuilder.Entity<Employee>()
                        .HasOptional(p => p.EmployeeAvailability)
                        .WithRequired(p => p.Employee);
        }

        #endregion

        #region Private Methods

        /// <summary>
        /// Set audit properties for entity,
        /// if new entity - "Inserted" datetime and "InsertedBy"
        /// if existing entity - "LastModified" datetime and "ModifiedBy"
        /// </summary>
        public void SetAuditProperties(EntityBase entity,
                                       EntityState state)
        {
            switch (state)
            {
                case EntityState.Added:
                    //entity.Inserted = TimeStamp;
                    entity.InsertedBy = null; //ToDo: Get current db user 
                    goto case EntityState.Modified;
                case EntityState.Modified:
                    //entity.LastModified = TimeStamp;
                    entity.ModifiedBy = null; //ToDo: Get current db user 
                    break;
            }
        }

        #endregion
       
    }
}