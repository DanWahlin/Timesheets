using System;
using System.Collections.Generic;
using System.Linq;
using Timesheets.Model;
namespace Timesheets.Repository
{
    public interface ITimesheetRepository
    {
        OperationStatus DeleteTimesheet(int id);
        Timesheet GetTimesheet(int id);
        IQueryable<Timesheet> GetTimesheets();
        IQueryable<Timesheet> GetTimesheets(int? empID, DateTime? weekEnding);
        OperationStatus InsertTimesheet(Timesheet timesheet);
        OperationStatus UpdateTimesheet(Timesheet timesheet);
    }
}
