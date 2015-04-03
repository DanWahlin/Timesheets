using System.Linq;
using Timesheets.Model;

namespace Timesheets.Repository
{
    public interface IDepartmentRepository
    {
        IQueryable<Department> GetDepartments();
    }
}