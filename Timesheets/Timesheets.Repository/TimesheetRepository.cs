using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheets.Model;

namespace Timesheets.Repository
{
    public class TimesheetRepository : RepositoryBase<TimesheetContext>, ITimesheetRepository
    {
        public IQueryable<Timesheet> GetTimesheets()
        {
            return DataContext.Timesheets.Include(ts => ts.Employee)
                .OrderBy(ts => ts.Employee.LastName)
                .OrderBy(ts => ts.Employee.FirstName);
        }

        public IQueryable<Timesheet> GetTimesheets(int? empID, DateTime? weekEnding)
        {
            var timesheets = GetTimesheets();
            if (empID != null) timesheets = timesheets.Where(ts => ts.Employee.ID == empID);
            if (weekEnding != null)
            {
                //Work around for EF not supporting ts.WeekEnding.Date == weekEnding.Value.Date
                var weekEndingDate = weekEnding.Value.Date;
                timesheets = timesheets.Where(ts => ts.WeekEnding.Year == weekEndingDate.Year &&
                                                    ts.WeekEnding.Month == weekEndingDate.Month &&
                                                    ts.WeekEnding.Day == weekEndingDate.Day);
            }
            return timesheets;
        }

        public Timesheet GetTimesheet(int id)
        {
            return DataContext.Timesheets
                              .Include(ts => ts.Employee)
                              .Include(ts => ts.Rows)
                              .Include(ts => ts.Rows.Select(row => row.DayValues))
                              .SingleOrDefault(ts => ts.ID == id);
        }

        public OperationStatus InsertTimesheet(Timesheet timesheet)
        {
            var opStatus = new OperationStatus();
            try
            {
                DataContext.Timesheets.Add(timesheet);
                DataContext.SaveChanges();
                opStatus.Status = true;
                opStatus.OperationID = timesheet.ID;
            }
            catch (Exception exp)
            {
                OperationStatus.CreateFromException("Error inserting timesheet", exp);
            }
            return opStatus;
        }

        public OperationStatus UpdateTimesheet(Timesheet timesheet)
        {
            var opStatus = new OperationStatus();
            try
            {
                var originalTimesheet = DataContext.Timesheets
                    .Include(ts => ts.Rows)
                    .SingleOrDefault(ts => ts.ID == timesheet.ID);
                if (originalTimesheet != null)
                {
                    DataContext.Timesheets.Remove(originalTimesheet);
                    DataContext.Timesheets.Add(timesheet);
                    DataContext.SaveChanges();
                    opStatus.Status = true;
                }
                else
                {
                    opStatus.Message = "Unable to update timesheet";
                }
            }
            catch (Exception exp)
            {
                OperationStatus.CreateFromException("Error inserting timesheet", exp);
            }
            return opStatus;
        }

        public OperationStatus DeleteTimesheet(int id)
        {
            var opStatus = new OperationStatus();
            try
            {
                var timesheet = DataContext.Timesheets
                    .Include(ts => ts.Rows)
                    .SingleOrDefault(ts => ts.ID == id);
                if (timesheet != null)
                {
                    DataContext.Timesheets.Remove(timesheet);
                    DataContext.SaveChanges();
                    opStatus.Status = true;
                }
                else
                {
                    opStatus.Message = "Unable to delete timesheet - not found";
                }
            }
            catch (Exception exp)
            {
                OperationStatus.CreateFromException("Error inserting timesheet", exp);
            }
            return opStatus;
        }
    }
}