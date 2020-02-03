using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace DesiresAPI.BL
{
    public class AppLogic : IAppLogic
    {
        AppDbContext appContext;

        public AppLogic(AppDbContext appContext) {
            this.appContext = appContext;
        }

        public LogicResponse TestBL() {
            return new LogicResponse { Status = true, Data = "Data from BL through IActionResponse" };
        }

        #region Maintenance Desire
        public LogicResponse GetDesires(DesireSP sp) {
            LogicResponse result = new LogicResponse();
            try {
                IQueryable<Desire> desires = appContext.Desires.Where(d => d.Status != "DELETED").Include(d => d.Options);
                if (!string.IsNullOrWhiteSpace(sp.SearchParam)) {
                    desires = desires.Where(d => d.Name.ToLower().Contains(sp.SearchParam));
                }
                if (!string.IsNullOrWhiteSpace(sp.Status)) {
                    desires = desires.Where(d => d.Status == sp.Status);
                }
                if (!string.IsNullOrWhiteSpace(sp.SortColumn)) {
                    desires = desires.OrderBy(sp.SortColumn + " " + sp.SortDirection);
                }
                if (sp.RowCount != 0 && sp.Page != 0) {
                    desires = desires.Skip(sp.RowCount * sp.Page).Take(sp.Page);
                }

                result.Data = desires.ToList();
                result.Status = true;
            }
            catch(Exception e) {
                result.Status = false;
                result.Message = e.ToString();
            }
            return result;
        }

        public LogicResponse GetDesire(int id) {
            LogicResponse result = new LogicResponse();
            try {
                Desire desire = 
                result.Data = appContext.Desires.Where(d => d.Id == id)
                                                .Where(d => d.Status != "DELETED")
                                                .Include(d => d.Options).FirstOrDefault();
                result.Status = true;
            }
            catch(Exception e) {
                result.Status = false;
                result.Message = e.ToString();
            }
            return result;
        }

        public LogicResponse UpdateDesire(Desire desire) {
            LogicResponse result = new LogicResponse();
            try {
                appContext.Desires.Update(desire);
                appContext.SaveChanges();
                result.Status = true;
            }
            catch(Exception e) {
                result.Status = false;
                result.Message = e.ToString();
            }
            return result;
        }

        public LogicResponse CreateDesire(Desire desire) {
            LogicResponse result = new LogicResponse();
            try {
                desire.Status = "ACTIVE";
                appContext.Desires.Add(desire);
                appContext.SaveChanges();
                result.Status = true;
            }
            catch(Exception e) {
                result.Status = false;
                result.Message = e.ToString();
            }
            return result;
        }

        public LogicResponse DeleteDesire(int id) {
            LogicResponse result = new LogicResponse();
            try {
                UpdateDesireStatus(id, "DELETED");
                result.Status = true;
            }
            catch(Exception e) {
                result.Status = false;
                result.Message = e.ToString();
            }
            return result;
        }

        public LogicResponse RetireDesire(int id) {
            LogicResponse result = new LogicResponse();
            try {
                UpdateDesireStatus(id, "RETIRED");
                result.Status = true;
            }
            catch (Exception e) {
                result.Status = false;
                result.Message = e.ToString();
            }
            return result;
        }

        public LogicResponse UnretireDesire(int id) {
            LogicResponse result = new LogicResponse();
            try {
                UpdateDesireStatus(id, "ACTIVE");
                result.Status = true;
            }
            catch (Exception e) {
                result.Status = false;
                result.Message = e.ToString();
            }
            return result;
        }

        void UpdateDesireStatus(int id, string status) {
            Desire desire = appContext.Desires.Where(d => d.Id == id).FirstOrDefault();
            desire.Status = status;
            appContext.Desires.Update(desire);
            appContext.SaveChanges();
        }
        #endregion

        public LogicResponse GetDayRecords(DayRecordSP sp) {
            LogicResponse result = new LogicResponse();
            try {
                IQueryable<DayRecord> dayRecords = appContext.DayRecords.Include(d => d.DayDesires).ThenInclude(dd => dd.Desire);
                if(sp.DateMin != null) {
                    dayRecords = dayRecords.Where(d => d.Date > sp.DateMin);
                }
                if (sp.DateMax != null) {
                    dayRecords = dayRecords.Where(d => d.Date < sp.DateMax);
                }

                result.Data = dayRecords.ToList();
                result.Status = true;
            }
            catch (Exception e) {
                result.Status = false;
                result.Message = e.ToString();
            }
            return result;
        }

        public LogicResponse EnterDayRecord(DayRecordEntry[] entries) {
            LogicResponse result = new LogicResponse();
            try {
                List<DayDesire> dayDesires = new List<DayDesire>();
                foreach (var entry in entries) {
                    Desire desire = appContext.Desires.Where(d => d.Id == entry.DesireId).FirstOrDefault();
                    dayDesires.Add(new DayDesire { Desire = desire, Score = entry.Score, Comment = entry.Comment });
                }
                DayRecord dayRecord = new DayRecord { Date = DateTime.Now, DayDesires = dayDesires };
                appContext.DayRecords.Add(dayRecord);
                appContext.SaveChanges();
                result.Status = true;
            }
            catch (Exception e) {
                result.Status = false;
                result.Message = e.ToString();
            }
            return result;
        }
    }
}
