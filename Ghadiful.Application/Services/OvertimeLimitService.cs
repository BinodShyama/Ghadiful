using AutoMapper;
using Ghadiful.Application.Abstractions;
using Ghadiful.DataAccess;
using Ghadiful.ViewModel.Organizations;
using Ghadiful.ViewModel.OvertimeLimit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ghadiful.Application.Services
{
    public class OvertimeLimitService : IOvertimeLimitService
    {
        public readonly IMapper _mapper;
        public readonly ApplicationDbContext _db;
        public readonly ILogger _logger;
        public OvertimeLimitService(IMapper mapper, ApplicationDbContext db, ILogger<OvertimeLimitService> logger)
        {
            _mapper = mapper;
            _db = db;
            _logger = logger;

        }
        public async Task<List<OvertimeLimitViewModel>> GetAsync()
        {
            try
            {
                return _mapper.Map<List<OvertimeLimitViewModel>>(await _db.OvertimeLimits.ToListAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw new InvalidDataException("Could not fetch data");
            }
        }
    }
}
