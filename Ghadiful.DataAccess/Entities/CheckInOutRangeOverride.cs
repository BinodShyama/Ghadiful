using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class CheckInOutRangeOverride
{
    public long Id { get; set; }

    public long EmployeeId { get; set; }

    public int CalendarId { get; set; }

    public int CheckInStartMinute { get; set; }

    public int CheckOutEndMinute { get; set; }

    public virtual Calendar Calendar { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;
}
