using System;
using System.Collections.Generic;
using System.Linq;
using Timesheets.Model;
using Timesheets.Repository;

namespace Timesheets.Repository.DbInitializers
{
    internal class DataInitializer
    {
        //http://www.behindthename.com/random/
        string[] _Names = {"Deimos Faunus", "Orestes Feidlimid", "Verethragna Pryderi", "Goibniu Raiden", "Italus Lir", 
                           "Ivar Ottosen", "Pankaja Sohrab", "Cerberus Aeneas", "Avi Ea", "Hirshel Stenberg",
                           "Osher Wakahisa", "Jaron Nakamura", "Matthias Rot", "Mads Suess", "Perseus Abels",
                           "Kai Hansson", "Ari Adamsen", "Ellil Suzuki", "Udi Fujimoto", "Chukwu Holmström"};

        private List<Department> _Departments = new List<Department>()
            {
                new Department { Name = "Engineering"},
                new Department { Name = "Sales"},
                new Department { Name = "Marketing"},
                new Department { Name = "Client Services"}
            };

        Random _Random = new Random();

        internal static void Initialize(TimesheetContext context)
        {
            var initializer = new DataInitializer();
            
            var departments = initializer.GetDepartments();
            foreach (var department in departments)
            {
                context.Departments.Add(department);
            }
            context.SaveChanges();

            var timesheets = initializer.GetTimesheetsMock();
            foreach (var timesheet in timesheets)
            {
                context.Timesheets.Add(timesheet);
            }
            context.SaveChanges();
        }

        private List<Department> GetDepartments()
        {
            return _Departments;
        } 

        private List<Timesheet> GetTimesheetsMock()
        {
            var timesheets = new List<Timesheet>();
            for (int i = 1; i < 20; i++) //i used as ID so start at 1
            {
                timesheets.Add(GetTimesheetMock(i));
            }
            return timesheets;
        }

        private Timesheet GetTimesheetMock(int id)
        {
            var dayValues = new List<DayValue>();
         
            for (int i = 0; i < 7; i++)
            {
                dayValues.Add(new DayValue { DayPosition = i, Hours = _Random.Next(10) });
            }
            var days = 7 + ((id % 4 == 0) ? id : 0);
            var weekLaterDay = DateTime.Now.AddDays(days);
            var followingSundayDay = 7 - (int)weekLaterDay.DayOfWeek;
            var followingWeekEnding = weekLaterDay.AddDays(followingSundayDay);

            var ts = new Timesheet
            {
                WeekEnding = followingWeekEnding,
                Employee = GetEmployeeMock(id),
                TotalHours = 0,
                Rows = new List<TimesheetRow>
                {
                    new TimesheetRow 
                    { 
                        CategoryID = 1, 
                        RowTotal = dayValues.Sum(dv => dv.Hours),
                        DayValues = dayValues
                    }
                }
            };
            ts.TotalHours = dayValues.Sum(dv => dv.Hours) * ts.Rows.Count;
            return ts;
        }

        private Department GetRandomDepartment()
        {
            return _Departments[_Random.Next(0, _Departments.Count - 1)];
        }

        private Employee GetEmployeeMock(int id)
        {
            var name = _Names[id].Split(new char[] { ' ' });
            return new Employee
            {
                DepartmentId = GetRandomDepartment().Id,
                FirstName = name[0],
                LastName = name[1],
                PhotoUrl = "/Content/pics/wahlin.jpg"
            };
        }
    }
}

