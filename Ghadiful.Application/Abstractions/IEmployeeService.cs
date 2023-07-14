using Ghadiful.ViewModel;
using Ghadiful.ViewModel.Employees;

namespace Ghadiful.Application.Abstractions
{
    public interface IEmployeeService
    {
        Task<List<EmployeeViewModel>> Get();
        Task<EmployeeViewModel> Get(long id);
        Task<List<EmployeeSearchViewModel>> Search(string query);
        Task<Response<EmployeeViewModel>> Create(EmployeeViewModel employee);
        Task<Response<bool>> Update();
        Task<Response<bool>> Delete(int id); 

        Task<List<EmployeeTagViewModel>> GetTags(long id);
        Task<List<EmployeeViewModel>> GetByOrganization(int id);
        Task<List<EmployeeViewModel>> GetByGroup(long id);
    }
}
