using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Timesheets.Model;

namespace Timesheets.Repository
{
    public interface IEmployeeRepository
    {
        OperationStatus DeleteEmployee(int id);
        Employee GetEmployee(int id);
        IQueryable<Employee> GetEmployees();
        OperationStatus InsertEmployee(Employee employee);
        OperationStatus UpdateEmployee(Employee employee);
    }
}
