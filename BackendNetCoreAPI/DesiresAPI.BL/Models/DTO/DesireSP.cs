using System;
using System.Collections.Generic;
using System.Text;

namespace DesiresAPI.BL
{
    public class DesireSP
    {
        public string SearchParam { get; set; }
        public string Status { get; set; }
        public string SortColumn { get; set; }
        public string SortDirection { get; set; }
        public int RowCount { get; set; }
        public int Page { get; set; }
    }
}
