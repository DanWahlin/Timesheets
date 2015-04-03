using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Timesheets.Model
{
    public class TimesheetRow
    {
        public int ID { get; set; }
        public int CategoryID { get; set; }
        public decimal RowTotal { get; set; }

        public virtual ICollection<DayValue> DayValues { get; set; }

        //public int MondayHours { get; set; }
        //public int TuesdayHours { get; set; }
        //public int WednesdayHours { get; set; }
        //public int ThursdayHours { get; set; }
        //public int FridayHours { get; set; }
        //public int SaturdayHours { get; set; }
        //public int SundayHours { get; set; }
    }
}
