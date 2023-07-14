using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class Employee
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string OfficialNumber { get; set; } = null!;

    public long DeviceEnrollNumber { get; set; }

    public string? PayrollNumber { get; set; }

    public string Status { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public bool PhoneNumberVerified { get; set; }

    public string? Email { get; set; }

    public bool EmailVerified { get; set; }

    public int LastOrganizationId { get; set; }

    public int LastPositionId { get; set; }

    public int CheckInStartMinute { get; set; }

    public int CheckOutEndMinute { get; set; }

    public int CheckInGraceMinute { get; set; }

    public int CheckOutGraceMinute { get; set; }

    public int OverTimeLimit { get; set; }

    public int LastTransferOrJoinedDate { get; set; }

    public int LastPromotionOrJoinedDate { get; set; }

    public virtual ICollection<BreakLog> BreakLogs { get; set; } = new List<BreakLog>();

    public virtual ICollection<CheckInOutLog> CheckInOutLogs { get; set; } = new List<CheckInOutLog>();

    public virtual ICollection<CheckInOutRangeOverride> CheckInOutRangeOverrides { get; set; } = new List<CheckInOutRangeOverride>();

    public virtual ICollection<EmployeeGroup> EmployeeGroups { get; set; } = new List<EmployeeGroup>();

    public virtual ICollection<EmployeePosition> EmployeePositions { get; set; } = new List<EmployeePosition>();

    public virtual ICollection<EmployeeTag> EmployeeTags { get; set; } = new List<EmployeeTag>();

    public virtual ICollection<EmployeeTransfer> EmployeeTransfers { get; set; } = new List<EmployeeTransfer>();

    public virtual ICollection<GraceTimeOverride> GraceTimeOverrides { get; set; } = new List<GraceTimeOverride>();

    public virtual Organization LastOrganization { get; set; } = null!;

    public virtual Position LastPosition { get; set; } = null!;

    public virtual Calendar LastPromotionOrJoinedDateNavigation { get; set; } = null!;

    public virtual Calendar LastTransferOrJoinedDateNavigation { get; set; } = null!;

    public virtual ICollection<LeaveBalance> LeaveBalances { get; set; } = new List<LeaveBalance>();

    public virtual ICollection<LeaveTaken> LeaveTakens { get; set; } = new List<LeaveTaken>();

    public virtual ICollection<ManualLog> ManualLogs { get; set; } = new List<ManualLog>();

    public virtual OvertimeLimit OverTimeLimitNavigation { get; set; } = null!;

    public virtual ICollection<OvertimeLimitOverride> OvertimeLimitOverrides { get; set; } = new List<OvertimeLimitOverride>();

    public virtual ICollection<OvertimeLog> OvertimeLogs { get; set; } = new List<OvertimeLog>();

    public virtual ICollection<User2> Users { get; set; } = new List<User2>();
}
