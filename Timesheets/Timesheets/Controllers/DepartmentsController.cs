using System.Collections.Generic;
using System.Web.Http;
using Timesheets.Model;
using Timesheets.Repository;

namespace Timesheets.Controllers
{
    public class DepartmentsController : ApiController
    {
         IDepartmentRepository _DepartmentRepository = new DepartmentRepository();

        public IEnumerable<Department> Get()
        {
            return _DepartmentRepository.GetDepartments();
        }
    }
}