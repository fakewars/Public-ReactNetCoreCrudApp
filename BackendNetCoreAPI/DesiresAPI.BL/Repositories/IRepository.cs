using System;
using System.Collections.Generic;
using System.Text;

namespace DesiresAPI.BL
{
    public interface IRepository
    {
        List<Desire> GetDesires(DesireSP sp);
        Desire GetDesire(int Id);
        string UpdateDesire(Desire desire);
        string CreateDesire(Desire desire);
    }
}
