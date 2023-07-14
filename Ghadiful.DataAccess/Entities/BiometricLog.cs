using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class BiometricLog
{
    public long Id { get; set; }

    public long EnrollNumber { get; set; }

    public int CalendarId { get; set; }

    public TimeSpan Timestamp { get; set; }

    public string InOutMode { get; set; } = null!;

    public string VerifyMode { get; set; } = null!;

    public int TrackerId { get; set; }

    public virtual Calendar Calendar { get; set; } = null!;

    public virtual BiometricTracker Tracker { get; set; } = null!;
}
