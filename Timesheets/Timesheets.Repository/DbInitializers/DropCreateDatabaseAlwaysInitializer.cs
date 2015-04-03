using System.Data.Entity;

namespace Timesheets.Repository.DbInitializers
{
    public class DropCreateDatabaseAlwaysInitializer : DropCreateDatabaseAlways<TimesheetContext>
    {
        protected override void Seed(TimesheetContext context)
        {
            DataInitializer.Initialize(context);
            base.Seed(context);
        }
    }   
}
