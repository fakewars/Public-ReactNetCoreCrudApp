using System;
using System.Collections.Generic;
using System.Text;

namespace DesiresAPI.BL
{
    public class DayRecordSP
    {
        public string SearchParam { get; set; } //May not be used
        public string Status { get; set; } //Desire status
        public DateTime? DateMin { get; set; }
        public DateTime? DateMax { get; set; }
    }
}
