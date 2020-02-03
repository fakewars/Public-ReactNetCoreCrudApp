using System;
using System.Collections.Generic;
using System.Text;

namespace DesiresAPI.BL
{
    public class DayDesire
    {
        public int Id { get; set; }
        public Desire Desire { get; set; }
        public int Score { get; set; }
        public string Comment { get; set; }
    }
}
