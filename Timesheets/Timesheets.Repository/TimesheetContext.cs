using System.Data.Entity;
using Timesheets.Model;

namespace Timesheets.Repository
{
    public class TimesheetContext : DbContext, IDisposedTracker
    {
        public DbSet<Timesheet> Timesheets { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }

        public bool IsDisposed { get; set; }
      
        protected override void Dispose(bool disposing)
        {
            IsDisposed = true;
            base.Dispose(disposing);
        }
    }
}
