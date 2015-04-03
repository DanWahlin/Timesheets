using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace Timesheets.Model
{
    public class DayValue
    {
        public int ID { get; set; }
        public int DayPosition { get; set; }
        public decimal Hours { get; set; }
    }
}
