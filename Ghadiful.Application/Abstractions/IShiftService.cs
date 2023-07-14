using Ghadiful.ViewModel.Shifts;

namespace Ghadiful.Application.Abstractions
{
    public interface IShiftService
    {
        Task<ShiftActionViewModel> CreateAsync(ShiftViewModel model);
        Task<ShiftActionViewModel> UpdateAsync(ShiftViewModel model);
        Task<bool> DeleteAsync(int id);

        Task<List<ShiftViewModel>> GetAsync();
        Task<ShiftActionViewModel> GetByIdAsync(int id);
    }
}
