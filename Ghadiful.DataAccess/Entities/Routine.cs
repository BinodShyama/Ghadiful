using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class Routine
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<MonthlyRoutine> MonthlyRoutines { get; set; } = new List<MonthlyRoutine>();

    public virtual ICollection<Schedule> Schedules { get; set; } = new List<Schedule>();
}
