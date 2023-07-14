using AutoMapper;
using Ghadiful.Application.Abstractions;
using Ghadiful.DataAccess;
using Ghadiful.ViewModel.Leave;
using Ghadiful.ViewModel.OvertimeLimit;
using Ghadiful.ViewModel.Reports;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Ghadiful.Application.Services
{
    public class LeaveService : ILeaveService
    {
        public readonly IMapper _mapper;
        public readonly ReportDbContext _db;
        public readonly ILogger _logger;
        public LeaveService(IMapper mapper, ReportDbContext db, ILogger<LeaveService> logger)
        {
            _mapper = mapper;
            _db = db;
            _logger = logger;

        }
        public async Task<List<LeaveBalanceViewModel>> GetBalanceAsync(long employeeId)
        {
            try
            {
                FormattableString query = $"select * from [dbo].[fnGetAllLeaveBalanceAsTable]({employeeId})";
               
                return _mapper.Map<List<LeaveBalanceViewModel>>(await _db.LeaveBalanceViewModel.FromSql(query).ToListAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw new InvalidDataException("Could not fetch data");
            }
        }
    }
}
