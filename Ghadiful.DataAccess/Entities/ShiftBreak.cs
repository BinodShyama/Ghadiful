using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class ShiftBreak
{
    public int Id { get; set; }

    public int ShiftId { get; set; }

    public int BreakId { get; set; }

    public TimeSpan StartTime { get; set; }

    public TimeSpan EndTime { get; set; }

    public bool AcrossMidnight { get; set; }

    public virtual Break Break { get; set; } = null!;

    public virtual Shift Shift { get; set; } = null!;
}
