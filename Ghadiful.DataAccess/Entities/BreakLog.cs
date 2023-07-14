using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class BreakLog
{
    public long Id { get; set; }

    public int CalendarId { get; set; }

    public long? EmployeeId { get; set; }

    public int ShiftId { get; set; }

    public TimeSpan BreakOut { get; set; }

    public TimeSpan? BreakIn { get; set; }

    public bool AcrossMidnight { get; set; }

    public bool AutomaticShift { get; set; }

    public virtual Calendar Calendar { get; set; } = null!;

    public virtual Employee? Employee { get; set; }

    public virtual Shift Shift { get; set; } = null!;
}
