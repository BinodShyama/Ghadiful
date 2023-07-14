using Ghadiful.ViewModel.Holiday;

namespace Ghadiful.Application.Abstractions
{
    public interface IHolidayEventService
    {
        Task<bool> SaveAsync(HolidayEventEditViewModel data);
        Task<bool> DeleteAsync(HolidayEventEditViewModel data);
        Task<List<HolidayEventViewModel>> GetAllEventAsync();
    }
}
