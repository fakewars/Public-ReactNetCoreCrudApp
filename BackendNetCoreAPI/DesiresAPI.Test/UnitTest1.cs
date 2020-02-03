using System;
using Xunit;
using DesiresAPI.BL;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace DesiresAPI.Test
{
    public class UnitTest1
    {
        IAppLogic appLogic;

        public UnitTest1() {
            this.appLogic = new AppLogic(new AppDbContext());
        }

        [Fact]
        public void GetFirstDesire() {
            Desire desire = (Desire)appLogic.GetDesire(1).Data;

            Assert.Equal("My new desire", desire.Name);
        }

        [Fact]
        public void GetDesireWithOutOfRangeInput() {
            Desire desire = (Desire)appLogic.GetDesire(0).Data;

            Assert.Null(desire);
        }
    }
}
