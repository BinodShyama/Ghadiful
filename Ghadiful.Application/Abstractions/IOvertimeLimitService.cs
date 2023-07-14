using Ghadiful.ViewModel;
using Ghadiful.ViewModel.Employees;
using Ghadiful.ViewModel.OvertimeLimit;

namespace Ghadiful.Application.Abstractions
{
    public interface IOvertimeLimitService
    {
        Task<List<OvertimeLimitViewModel>> GetAsync();
       
    }
}
