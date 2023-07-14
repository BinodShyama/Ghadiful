using AutoMapper;
using Ghadiful.Application.Abstractions;
using Ghadiful.DataAccess;
using Ghadiful.ViewModel;
using Ghadiful.ViewModel.Employees;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Ghadiful.Application.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public EmployeeService(ApplicationDbContext dbContext, IMapper mapper, ILogger<EmployeeService> logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public Task<Response<EmployeeViewModel>> Create(EmployeeViewModel model)
        {
            throw new NotImplementedException();
        }

        public Task<Response<bool>> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<EmployeeViewModel>> Get()
        {
            try
            {
                return _mapper.Map<List<EmployeeViewModel>>(await _dbContext.Employees.Include(c=>c.LastOrganization).ToListAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw new InvalidDataException();
            }
        }
        public async Task<EmployeeViewModel> Get(long id)
        {
            try
            {
                return _mapper.Map<EmployeeViewModel>(await _dbContext.Employees
                    .Include(x => x.LastOrganization).Include(x => x.LastPosition).Include(x=>x.OverTimeLimitNavigation)
                    .FirstOrDefaultAsync(e => e.Id == id)); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw new InvalidDataException();
            }
        }

        public async Task<List<EmployeeViewModel>> GetByOrganization(int id)
        {
             return _mapper.Map<List<EmployeeViewModel>>(await _dbContext.Employees
                 .Where(x=>x.LastOrganizationId == id)
                 .Include(x=>x.LastPosition)
                 .Include(c=>c.LastOrganization)
                 .Include(x=>x.OverTimeLimitNavigation)
                 .ToListAsync());
        }
         public async Task<List<EmployeeViewModel>> GetByGroup(long id)
        {
            //var empGroup = await _dbContext.EmployeeGroups.Where(x => x.GroupId == id).ToListAsync();

             return _mapper.Map<List<EmployeeViewModel>>(await 
                  _dbContext.Employees.Where(x => x.EmployeeGroups.Any(m => m.GroupId == id && m.EmployeeId == x.Id))
                 .Include(x=>x.LastPosition)
                 .Include(c=>c.LastOrganization)
                 .Include(x=>x.OverTimeLimitNavigation)
                 .ToListAsync());
        }

        public async Task<List<EmployeeTagViewModel>> GetTags(long id)
        {
            try
            {
                return _mapper.Map<List<EmployeeTagViewModel>>(await _dbContext.EmployeeTags.Where(e => e.EmployeeId == id).ToListAsync()); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw new InvalidDataException();
            }
        }
        public async Task<List<EmployeeSearchViewModel>> Search(string query)
        {
            try
            {
                return _mapper.Map<List<EmployeeSearchViewModel>>(await _dbContext.Employees.Where(x=>x.Name.Contains(query)).ToListAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw new InvalidDataException();
            }
        }

        public Task<Response<bool>> Update()
        {
            throw new NotImplementedException();
        }
    }
}
