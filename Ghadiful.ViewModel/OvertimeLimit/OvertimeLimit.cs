﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ghadiful.ViewModel.OvertimeLimit
{
    public class OvertimeLimitViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public decimal BeforeShift { get; set; }
        public decimal AfterShift { get; set; }
    }
}
