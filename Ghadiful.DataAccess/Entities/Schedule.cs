using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class Schedule
{
    public long Id { get; set; }

    public long RoutineId { get; set; }

    public long GroupId { get; set; }

    public int StartDate { get; set; }

    public int? EndDate { get; set; }

    public bool RepeatYearly { get; set; }

    public virtual Calendar? EndDateNavigation { get; set; }

    public virtual Group Group { get; set; } = null!;

    public virtual Routine Routine { get; set; } = null!;

    public virtual Calendar StartDateNavigation { get; set; } = null!;
}
