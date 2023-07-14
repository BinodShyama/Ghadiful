using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class ScheduleOverride
{
    public long Id { get; set; }

    public long GroupId { get; set; }

    public int CalendarId { get; set; }

    public int ShiftId { get; set; }

    public virtual Calendar Calendar { get; set; } = null!;

    public virtual Group Group { get; set; } = null!;

    public virtual Shift Shift { get; set; } = null!;
}
