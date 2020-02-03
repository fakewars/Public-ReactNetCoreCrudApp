using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DesiresAPI.BL
{
    public class Desire
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Option> Options { get; set; }
        public string Status { get; set; } //ACTIVE, RETIRED, DELETED
    }
}
