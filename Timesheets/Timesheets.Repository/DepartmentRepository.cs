using System.Linq;
using Timesheets.Model;

namespace Timesheets.Repository
{
    public class DepartmentRepository : RepositoryBase<TimesheetContext>, IDepartmentRepository
    {
        public IQueryable<Department> GetDepartments()
        {
            return DataContext.Departments;
        }
    }
}