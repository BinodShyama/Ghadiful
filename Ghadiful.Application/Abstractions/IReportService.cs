using Ghadiful.ViewModel.Organizations;
using Ghadiful.ViewModel.Reports;

namespace Ghadiful.Application.Abstractions
{
    public interface IReportService
    {
        Task<List<CheckInViewModel>> GetCheckInDataAsync(int startDate, int endDate, int orgId, long empId);
        Task<List<OvertimeViewModel>> GetOvertimeDataAsync(int startDate, int endDate, int orgId, long empId);

        Task<List<PayrollSummaryViewModel>> GetPayrollSummaryDataAsync(int startDate, int endDate, int orgId, long empId);
    }
}
