using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class AttendanceLogToday
{
    public long Id { get; set; }

    public long EnrollNumber { get; set; }

    public DateTime Addate { get; set; }

    public int Bsdate { get; set; }

    public TimeSpan Timestamp { get; set; }

    public string Type { get; set; } = null!;

    public int BioTrackerId { get; set; }

    public string VerifyMode { get; set; } = null!;

    public virtual BiometricTracker BioTracker { get; set; } = null!;
}
