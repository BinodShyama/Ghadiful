using AutoMapper;
using Ghadiful.Application.Abstractions;
using Ghadiful.DataAccess;
using Ghadiful.ViewModel.Designation;
using Ghadiful.ViewModel.Employees;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ghadiful.Application.Services
{
    public class DesignationService : IDesignationService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;
         public DesignationService(ApplicationDbContext dbContext, IMapper mapper, ILogger<EmployeeService> logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<List<DesignationViewModel>> Get()
        {
            try
            {
                return _mapper.Map<List<DesignationViewModel>>(await _dbContext.Positions.OrderBy(x=>x.Name).ToListAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw new InvalidDataException();
            }
        }

        public Task<DesignationViewModel> Get(long id)
        {
            throw new NotImplementedException();
        }

        public Task<List<DesignationTagViewModel>> GetTags(long id)
        {
            throw new NotImplementedException();
        }

        public Task<List<DesignationViewModel>> Search(string query)
        {
            throw new NotImplementedException();
        }
    }
}
