using AutoMapper;
using Ghadiful.Application.Abstractions;
using Ghadiful.DataAccess;
using Ghadiful.ViewModel.Organizations;
using Ghadiful.ViewModel.Reports;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Ghadiful.Application.Services
{
    public class ReportService : IReportService
    {
        public readonly IMapper _mapper;
        public readonly ReportDbContext _db;
        public readonly ILogger _logger;

        public ReportService(IMapper mapper, ReportDbContext db, ILogger<ReportService> logger)
        {
            _mapper = mapper;
            _db = db;
            _logger = logger;
        }

        public async Task<List<CheckInViewModel>> GetCheckInDataAsync(int startDate, int endDate, int orgId, long empId)
        {
            try
            {
                FormattableString  query = $"exec AllCheckInOutReport {startDate},{endDate}";
                if(orgId > 0)
                {
                     query = $"exec OrganizationCheckInOutReport {startDate},{endDate},{orgId}";
                }
                if(empId > 0)
                {
                    query = $"exec EmployeeCheckInOutReport {startDate},{endDate},{empId}";
                }
                return _mapper.Map<List<CheckInViewModel>>(await _db.CheckInViewModel.FromSql(query).ToListAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw new InvalidDataException("Could not fetch data");
            }

        }
        public async Task<List<OvertimeViewModel>> GetOvertimeDataAsync(int startDate, int endDate, int orgId, long empId)
        {
            try
            {
                FormattableString query = $"exec AllOvertimeReport {startDate},{endDate}";
                if (orgId > 0)
                {
                    query = $"exec OrganizationOvertimeReport {startDate},{endDate},{orgId}";
                }
                if (empId > 0)
                {
                    query = $"exec EmployeeOvertimeReport {startDate},{endDate},{empId}";
                }
                return _mapper.Map<List<OvertimeViewModel>>(await _db.OvertimeViewModel.FromSql(query).ToListAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw new InvalidDataException("Could not fetch data");
            }
        }
        public async Task<List<PayrollSummaryViewModel>> GetPayrollSummaryDataAsync(int startDate, int endDate, int orgId, long empId)
        {
            try
            {
                FormattableString query = $"exec AllPayrollSummaryReport {startDate},{endDate}";
                //if (orgId > 0)
                //{
                //    query = $"exec OrganizationPayrollReport {startDate},{endDate},{orgId}";
                //}
                //if (empId > 0)
                //{
                //    query = $"exec EmployeePayrollReport {startDate},{endDate},{empId}";
                //}
                return _mapper.Map<List<PayrollSummaryViewModel>>(await _db.PayrollSummaryViewModel.FromSql(query).ToListAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw new InvalidDataException("Could not fetch data");
            }
        }
    }
}
