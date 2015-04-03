using System.Data.Entity;

namespace Timesheets.Repository.DbInitializers
{
    public class ModelChangedInitializer : DropCreateDatabaseIfModelChanges<TimesheetContext>
    {
        protected override void Seed(TimesheetContext context)
        {
            DataInitializer.Initialize(context);
            base.Seed(context);
        }
    }
}
