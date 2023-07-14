using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class EmployeePosition
{
    public long Id { get; set; }

    public long EmployeeId { get; set; }

    public int? PositionId { get; set; }

    public int StartDate { get; set; }

    public int EndDate { get; set; }

    public virtual Employee Employee { get; set; } = null!;

    public virtual Calendar EndDateNavigation { get; set; } = null!;

    public virtual Position? Position { get; set; }

    public virtual Calendar StartDateNavigation { get; set; } = null!;
}
