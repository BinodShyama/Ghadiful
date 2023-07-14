using Ghadiful.ViewModel;
using Ghadiful.ViewModel.Designation;
using Ghadiful.ViewModel.Employees;

namespace Ghadiful.Application.Abstractions
{
    public interface IDesignationService
    {
        Task<List<DesignationViewModel>> Get();
        Task<DesignationViewModel> Get(long id);
        Task<List<DesignationViewModel>> Search(string query);     

        Task<List<DesignationTagViewModel>> GetTags(long id);
    }
}
