using System;
using System.Collections.Generic;
using System.Text;

namespace DesiresAPI.BL
{
    public interface IAppLogic
    {
        LogicResponse TestBL();
        LogicResponse GetDesires(DesireSP sp);
        LogicResponse GetDesire(int Id);
        LogicResponse UpdateDesire(Desire desire);
        LogicResponse CreateDesire(Desire desire);
        LogicResponse DeleteDesire(int id);
        LogicResponse RetireDesire(int id);
        LogicResponse GetDayRecords(DayRecordSP sp);
        LogicResponse EnterDayRecord(DayRecordEntry[] entries);
        LogicResponse UnretireDesire(int id);
    }
}
