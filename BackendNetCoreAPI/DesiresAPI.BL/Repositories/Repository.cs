using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DesiresAPI.BL
{
    public class Repository : IRepository
    {
        List<Desire> desires;

        public Repository() {
            //desires = new List<Desire>() {
            //    new Desire{Id = 1, Name = "Own a VR System", Options = new List<string> { "Very High", "High", "Medium", "Low", "Very Low" } },
            //    new Desire{Id = 2, Name = "Own an SD", Options = new List<string> { "Very High", "High", "Medium", "Low", "Very Low" } },
            //    new Desire{Id = 3, Name = "Live in another country", Options = new List<string> { "Very High", "High", "Medium", "Low", "Very Low" } },
            //    new Desire{Id = 4, Name = "Learn Japanese", Options = new List<string> { "Very High", "High", "Medium", "Low", "Very Low" } },
            //    new Desire{Id = 5, Name = "Learn piano", Options = new List<string> { "Very High", "High", "Medium", "Low", "Very Low" } },
            //    new Desire{Id = 6, Name = "Learn 2D art", Options = new List<string> { "Very High", "High", "Medium", "Low", "Very Low" } }
            //};
        }

        public Desire GetDesire(int id) {
            Desire result = desires.Where(d => d.Id == id).FirstOrDefault();
            return result;
        }

        public List<Desire> GetDesires(DesireSP sp) {
            List<Desire> result = desires;
            return result;
        }

        public string CreateDesire(Desire desire) {
            string result = "";

            int maxId = desires.Max(d => d.Id);
            desire.Id = ++maxId;
            desires.Add(desire);

            result += "True";
            return result;
        }

        public string UpdateDesire(Desire desire) {
            string result = "";

            Desire desireToUpdate = desires.Where(d => d.Id == desire.Id).FirstOrDefault();
            desireToUpdate = desire;

            result += "True";
            return result;
        }
    }
}
