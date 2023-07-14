using Ghadiful.ViewModel;
using Ghadiful.ViewModel.Users;

namespace Ghadiful.Application.Abstractions
{
    public interface IUserService
    {
        Task<Response<UserViewModel>> Create(UserViewModel model);
        Task<Response<UserViewModel>> Update(UserViewModel model, string id);
        Task<Response<bool>> Delete(string id);
        Task<List<UserViewModel>> GetAll();
        Task<UserViewModel> Get(string id);
    }
}
