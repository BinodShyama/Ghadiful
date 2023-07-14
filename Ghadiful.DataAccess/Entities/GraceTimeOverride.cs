using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class GraceTimeOverride
{
    public long Id { get; set; }

    public long EmployeeId { get; set; }

    public int CalendarId { get; set; }

    public int CheckInGraceMinute { get; set; }

    public int CheckOutGraceMinute { get; set; }

    public virtual Calendar Calendar { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;
}
