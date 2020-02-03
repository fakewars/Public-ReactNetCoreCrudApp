using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DesiresAPI.BL;
using System.Text.Json;
using Microsoft.AspNetCore.Cors;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DesiresAPI
{
    [ApiController]
    [EnableCors("MyPolicy")]
    [Route("Api")]
    public class DesiresAPIController : Controller
    {
        IAppLogic appLogic;
        public DesiresAPIController(IAppLogic appLogic) {
            this.appLogic = appLogic;
        }

        [HttpGet]
        [Route("TestJson")]
        public dynamic TestJson() {
            return new Desire { Id = 1, Name = "Test json success", Status = "Success" };
        }

        [HttpGet]
        [Route("TestBL")]
        public IActionResult TestBL() {
            var result = appLogic.TestBL();
            return Ok(result);
        }

        [HttpPost]
        [Route("GetDesires")]
        public IActionResult GetDesires(DesireSP sp) {
            var result = appLogic.GetDesires(sp);
            return Ok(result);
        }

        [HttpGet]
        [Route("GetDesire/{id}")]
        public IActionResult GetDesire(int id) {
            var result = appLogic.GetDesire(id);
            return Ok(result);
        }

        [HttpDelete]
        [Route("DeleteDesire/{id}")]
        public IActionResult Delete(int id) {
            var result = appLogic.DeleteDesire(id);
            return Ok(result);
        }

        [HttpDelete]
        [Route("RetireDesire/{id}")]
        public IActionResult Retire(int id) {
            var result = appLogic.RetireDesire(id);
            return Ok(result);
        }

        [HttpDelete]
        [Route("UnretireDesire/{id}")]
        public IActionResult UnRetire(int id) {
            var result = appLogic.UnretireDesire(id);
            return Ok(result);
        }

        [HttpPut]
        [Route("UpdateDesire")]
        public IActionResult UpdateDesire(Desire desire) {
            var result = appLogic.UpdateDesire(desire);
            return Ok(result);
        }

        [HttpPost]
        [Route("CreateDesire")]
        public IActionResult CreateDesire(Desire desire) {
            var result = appLogic.CreateDesire(desire);
            return Ok(result);
        }

        [HttpPost]
        [Route("GetDayRecords")]
        public IActionResult GetDayRecords(DayRecordSP sp) {
            var result = appLogic.GetDayRecords(sp);
            return Ok(result);
        }

        [HttpPost]
        [Route("EnterDayRecord")]
        public IActionResult EnterDayRecord(DayRecordEntry[] entries) {
            var result = appLogic.EnterDayRecord(entries);
            return Ok(result);
        }
    }
}
