using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class CheckInOutLog
{
    public long Id { get; set; }

    public int CalendarId { get; set; }

    public long EmployeeId { get; set; }

    public int ShiftId { get; set; }

    public TimeSpan CheckIn { get; set; }

    public TimeSpan? CheckOut { get; set; }

    public bool AcrossMidnight { get; set; }

    public bool AutomaticShift { get; set; }

    public int EmpOrganizationId { get; set; }

    public int CinOrganizationId { get; set; }

    public int CoutOrganizationId { get; set; }

    public string CinSourceType { get; set; } = null!;

    public long CinSourceId { get; set; }

    public string? CoutSourceType { get; set; }

    public long? CoutSourceId { get; set; }

    public virtual Calendar Calendar { get; set; } = null!;

    public virtual Organization CinOrganization { get; set; } = null!;

    public virtual Organization CoutOrganization { get; set; } = null!;

    public virtual Organization EmpOrganization { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;

    public virtual Shift Shift { get; set; } = null!;
}
