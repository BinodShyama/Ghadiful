using Ghadiful.ViewModel.Employees;
using Ghadiful.ViewModel.Organizations;

namespace Ghadiful.Application.Abstractions
{
    public interface IOrganizationService
    {
        Task<List<OrganizationViewModel>> GetAsync();
        Task<OrganizationViewModel> GetAsync(int id);
        Task<List<OrganizationTagViewModel>> GetTags(int id);
    }
}
