using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class Shift
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;

    public TimeSpan? StartTime { get; set; }

    public TimeSpan? EndTime { get; set; }

    public bool AcrossMidnight { get; set; }

    public TimeSpan? Duration { get; set; }

    public string Type { get; set; } = null!;

    public virtual ICollection<BreakLog> BreakLogs { get; set; } = new List<BreakLog>();

    public virtual ICollection<CheckInOutLog> CheckInOutLogs { get; set; } = new List<CheckInOutLog>();

    public virtual ICollection<MonthlyRoutine> MonthlyRoutines { get; set; } = new List<MonthlyRoutine>();

    public virtual ICollection<OvertimeLog> OvertimeLogs { get; set; } = new List<OvertimeLog>();

    public virtual ICollection<ScheduleOverride> ScheduleOverrides { get; set; } = new List<ScheduleOverride>();

    public virtual ICollection<ShiftBreak> ShiftBreaks { get; set; } = new List<ShiftBreak>();
}
