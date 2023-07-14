using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ghadiful.ViewModel.Leave
{
    public class LeaveBalanceViewModel
    {
        public long LeaveId { get; set; }
        public string LeaveName { get; set; }        
        public decimal Balance { get; set; }
    }
}
