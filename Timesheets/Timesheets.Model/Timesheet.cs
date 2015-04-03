using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Timesheets.Model
{
    public class Timesheet
    {
        public int ID { get; set; }
        public int EmployeeID { get; set; }
        public Employee Employee { get; set; }
        public DateTime WeekEnding { get; set; }
        public decimal TotalHours { get; set; }
        public virtual ICollection<TimesheetRow> Rows { get; set; }
    }
}