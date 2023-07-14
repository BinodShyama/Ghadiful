using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class LeaveTakenPolicy
{
    public long Id { get; set; }

    public long LeaveId { get; set; }

    public long? EligibleGroupId { get; set; }

    public decimal MinDuration { get; set; }

    public decimal MaxDuration { get; set; }

    public int MinDaysBetween { get; set; }

    public int MaxTimesInLeaveYear { get; set; }

    public int MaxTimesInServicePeriod { get; set; }

    public bool ExcludeHoliday { get; set; }

    public bool ExcludeDayOff { get; set; }

    public virtual EmployeeGroup? EligibleGroup { get; set; }

    public virtual Leave Leave { get; set; } = null!;
}
