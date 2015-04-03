using System.Collections.Generic;
using System.Web.Http;
using Timesheets.Model;
using Timesheets.Repository;

namespace Timesheets.Controllers
{
    public class EmployeesController : ApiController
    {

        IEmployeeRepository _EmployeeRepository = new EmployeeRepository();

      
        // GET api/employees
        public IEnumerable<Employee> Get()
        {
            return _EmployeeRepository.GetEmployees();
        }

        // GET api/employees/5
        public Employee Get(int id)
        {
            return _EmployeeRepository.GetEmployee(id);
        }

        // POST api/employees
        public Employee Post([FromBody]Employee employee)
        {
            _EmployeeRepository.InsertEmployee(employee);
            return employee;
        }

        // PUT api/employees/5
        public Employee Put(int id, [FromBody]Employee employee)
        {
            _EmployeeRepository.UpdateEmployee(employee);
            return employee;
        }

        // DELETE api/employees/5
        public void Delete(int id)
        {
            _EmployeeRepository.DeleteEmployee(id);
        }

    }
}
