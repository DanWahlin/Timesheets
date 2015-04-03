using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Timesheets.Model;
using Timesheets.Repository;

namespace Timesheets.Controllers
{
    public class TimesheetsController : ApiController
    {
        ITimesheetRepository _TimesheetRepository = new TimesheetRepository();

        //public TimesheetsController(ITimesheetsRepository timesheetsRepository)
        //{
        //    _TimesheetRepository = timesheetsRepository;
        //}

        // GET api/timesheets
        public IEnumerable<Timesheet> Get()
        {
            return _TimesheetRepository.GetTimesheets();
        }

        public IEnumerable<Timesheet> Get(int? empID, DateTime? weekEnding)
        {
            return _TimesheetRepository.GetTimesheets(empID, weekEnding);
        }

        // GET api/timesheets/5
        public Timesheet Get(int id)
        {
            return _TimesheetRepository.GetTimesheet(id);
        }

        // POST api/timesheets
        public HttpResponseMessage Post([FromBody]Timesheet timesheet)
        {
            var opStatus = _TimesheetRepository.InsertTimesheet(timesheet);

            if (!opStatus.Status)
            {
                throw new HttpResponseException(Request.CreateResponse<OperationStatus>(HttpStatusCode.NotFound, opStatus));
            }

            //Generate success response
            var response = Request.CreateResponse<OperationStatus>(HttpStatusCode.Created, opStatus);
            string uri = Url.Link("DefaultApi", new { id = opStatus.OperationID });
            response.Headers.Location = new Uri(uri);
            return response;
            
        }

        // PUT api/timesheets/5
        public HttpResponseMessage Put(int id, [FromBody]Timesheet timesheet)
        {
            var opStatus = _TimesheetRepository.UpdateTimesheet(timesheet);

            if (!opStatus.Status)
            {
                throw new HttpResponseException(Request.CreateResponse<OperationStatus>(HttpStatusCode.NotFound, opStatus));
            }

            //Generate success response
            var response = Request.CreateResponse<OperationStatus>(HttpStatusCode.OK, opStatus);
            return response;
        }

        // DELETE api/timesheets/5
        public HttpResponseMessage Delete(int id)
        {
            var opStatus = _TimesheetRepository.DeleteTimesheet(id);

            if (!opStatus.Status)
            {
                throw new HttpResponseException(Request.CreateResponse<OperationStatus>(HttpStatusCode.NotFound, opStatus));
            }

            //Generate success response
            var response = Request.CreateResponse<OperationStatus>(HttpStatusCode.OK, opStatus);
            return response;

           
        }
    }
}