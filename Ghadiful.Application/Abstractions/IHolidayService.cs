using Ghadiful.ViewModel.Holiday;

namespace Ghadiful.Application.Abstractions
{
    public interface IHolidayService
    {
        Task<List<HolidayViewModel>> GetAllHolidayAsync();
        Task<HolidayViewModel> GetHolidayAsync(int id);

        Task<int> SaveAsync(HolidayViewModel model);
    }
}
