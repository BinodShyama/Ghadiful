using Ghadiful.ViewModel.Leave;
using Ghadiful.ViewModel.Reports;
using Microsoft.EntityFrameworkCore;

namespace Ghadiful.DataAccess
{
    public partial class ReportDbContext : ApplicationDbContext
    {
        public virtual DbSet<CheckInViewModel> CheckInViewModel { get; set; }
        public virtual DbSet<OvertimeViewModel> OvertimeViewModel { get; set; }
        public virtual DbSet<LeaveBalanceViewModel> LeaveBalanceViewModel { get; set; }

        public virtual DbSet<PayrollSummaryViewModel> PayrollSummaryViewModel { get; set; }

        public ReportDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
    }
}
