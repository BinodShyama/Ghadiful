using Ghadiful.ViewModel.Leave;
using Ghadiful.ViewModel.OvertimeLimit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ghadiful.Application.Abstractions
{
    public interface ILeaveService
    {
        Task<List<LeaveBalanceViewModel>> GetBalanceAsync(long employeeId);
        
    }
}
