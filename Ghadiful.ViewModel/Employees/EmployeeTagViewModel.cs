﻿using Microsoft.AspNetCore.Mvc.ViewFeatures.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ghadiful.ViewModel.Employees
{
    public class EmployeeTagViewModel
    {
        public long EmployeeId { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
