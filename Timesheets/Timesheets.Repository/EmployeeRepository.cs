using System.Data;
using System.Linq;
using Timesheets.Model;

namespace Timesheets.Repository
{
    public class EmployeeRepository : RepositoryBase<TimesheetContext>, IEmployeeRepository
    {
        public Employee GetEmployee(int id)
        {
            return DataContext.Employees.SingleOrDefault(e => e.ID == id);
        }

        public IQueryable<Employee> GetEmployees()
        {
            return DataContext.Employees.OrderBy(e => e.LastName);
        }

        public OperationStatus InsertEmployee(Employee employee)
        {
            DataContext.Employees.Add(employee);
            DataContext.SaveChanges();
            return new OperationStatus() {Status = true};
        }

        public OperationStatus UpdateEmployee(Employee employee)
        {
            DataContext.Entry(employee).State = EntityState.Modified;
            DataContext.SaveChanges();
            return new OperationStatus() { Status = true };
        }

        public OperationStatus DeleteEmployee(int id)
        {
            DataContext.Employees.Remove(DataContext.Employees.Find(id));
            DataContext.SaveChanges();
            return new OperationStatus() { Status = true };
        }
    }
}
