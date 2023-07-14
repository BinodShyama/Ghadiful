using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class Calendar
{
    public int Id { get; set; }

    public DateTime Addate { get; set; }

    public int Bsdate { get; set; }

    public int MonthId { get; set; }

    public virtual ICollection<ApprovalHistory> ApprovalHistories { get; set; } = new List<ApprovalHistory>();

    public virtual ICollection<BiometricLog> BiometricLogs { get; set; } = new List<BiometricLog>();

    public virtual ICollection<BreakLog> BreakLogs { get; set; } = new List<BreakLog>();

    public virtual ICollection<CheckInOutLog> CheckInOutLogs { get; set; } = new List<CheckInOutLog>();

    public virtual ICollection<CheckInOutRangeOverride> CheckInOutRangeOverrides { get; set; } = new List<CheckInOutRangeOverride>();

    public virtual ICollection<Employee> EmployeeLastPromotionOrJoinedDateNavigations { get; set; } = new List<Employee>();

    public virtual ICollection<Employee> EmployeeLastTransferOrJoinedDateNavigations { get; set; } = new List<Employee>();

    public virtual ICollection<EmployeePosition> EmployeePositionEndDateNavigations { get; set; } = new List<EmployeePosition>();

    public virtual ICollection<EmployeePosition> EmployeePositionStartDateNavigations { get; set; } = new List<EmployeePosition>();

    public virtual ICollection<EmployeeTransfer> EmployeeTransferEndDateNavigations { get; set; } = new List<EmployeeTransfer>();

    public virtual ICollection<EmployeeTransfer> EmployeeTransferStartDateNavigations { get; set; } = new List<EmployeeTransfer>();

    public virtual ICollection<GraceTimeOverride> GraceTimeOverrides { get; set; } = new List<GraceTimeOverride>();

    public virtual ICollection<HolidayCalendar> HolidayCalendars { get; set; } = new List<HolidayCalendar>();

    public virtual ICollection<LeaveBalance> LeaveBalanceEffectiveDateNavigations { get; set; } = new List<LeaveBalance>();

    public virtual ICollection<LeaveBalance> LeaveBalanceExpiryDateNavigations { get; set; } = new List<LeaveBalance>();

    public virtual ICollection<LeaveTaken> LeaveTakenEndDateNavigations { get; set; } = new List<LeaveTaken>();

    public virtual ICollection<LeaveTaken> LeaveTakenStartDateNavigations { get; set; } = new List<LeaveTaken>();

    public virtual ICollection<ManualLog> ManualLogs { get; set; } = new List<ManualLog>();

    public virtual CalendarMonth Month { get; set; } = null!;

    public virtual ICollection<Notice> Notices { get; set; } = new List<Notice>();

    public virtual ICollection<OvertimeLimitOverride> OvertimeLimitOverrides { get; set; } = new List<OvertimeLimitOverride>();

    public virtual ICollection<OvertimeLog> OvertimeLogs { get; set; } = new List<OvertimeLog>();

    public virtual ICollection<Schedule> ScheduleEndDateNavigations { get; set; } = new List<Schedule>();

    public virtual ICollection<ScheduleOverride> ScheduleOverrides { get; set; } = new List<ScheduleOverride>();

    public virtual ICollection<Schedule> ScheduleStartDateNavigations { get; set; } = new List<Schedule>();

    public virtual ICollection<TrackerAssignment> TrackerAssignmentTrackingEndDateNavigations { get; set; } = new List<TrackerAssignment>();

    public virtual ICollection<TrackerAssignment> TrackerAssignmentTrackingStartDateNavigations { get; set; } = new List<TrackerAssignment>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
