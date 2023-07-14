using Ghadiful.ViewModel.Groups;

namespace Ghadiful.Application.Abstractions
{
    public   interface IGroupService
    {
        Task<GroupViewModel> GetGroupAsync(int id);
        Task<List<GroupViewModel>> GetAllGroupAsync();
    }
}
