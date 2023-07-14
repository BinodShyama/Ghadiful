using AutoMapper;
using Ghadiful.Application.Abstractions;
using Ghadiful.DataAccess;
using Ghadiful.ViewModel.Employees;
using Ghadiful.ViewModel.Organizations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Security.Cryptography.X509Certificates;

namespace Ghadiful.Application.Services
{
    public class OrganizationService : IOrganizationService
    {
        public readonly IMapper _mapper;
        public readonly ApplicationDbContext _db;
        public readonly ILogger _logger;

        public OrganizationService(IMapper mapper, ApplicationDbContext db, ILogger<OrganizationService> logger)
        {
            _mapper = mapper;
            _db = db;
            _logger = logger;
        }

        public async Task<List<OrganizationViewModel>> GetAsync()
        {
            try
            {
                return _mapper.Map<List<OrganizationViewModel>>(await _db.Organizations.ToListAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw new InvalidDataException("Could not fetch data");
            }
        }
        public async Task<OrganizationViewModel> GetAsync(int id)
        {
            try
            {
                 return _mapper.Map<OrganizationViewModel>(await _db.Organizations
                     .Include(x=>x.OrganizationTags)
                    .FirstOrDefaultAsync(e => e.Id == id)); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw new InvalidDataException();
            }
        }
        public async Task<List<OrganizationTagViewModel>> GetTags(int id)
        {
            try
            {
                return _mapper.Map<List<OrganizationTagViewModel>>(await _db.OrganizationTags.Where(e => e.OrganizationId == id).ToListAsync()); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw new InvalidDataException();
            }
        }
    }
}
