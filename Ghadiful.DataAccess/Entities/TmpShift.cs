using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class TmpShift
{
    public long? ShiftId { get; set; }

    public string Shiftname { get; set; } = null!;

    public string? ShiftCode { get; set; }

    public TimeSpan? BeginTime { get; set; }

    public TimeSpan? EndTime { get; set; }

    public int? IsNight { get; set; }

    public TimeSpan? ShiftDuration { get; set; }

    public string? Type { get; set; }
}
