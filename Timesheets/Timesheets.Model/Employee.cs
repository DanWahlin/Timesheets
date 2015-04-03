namespace Timesheets.Model
{
    public class Employee
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string PhotoUrl { get; set; }
        public int DepartmentId { get; set; }
    }
}
