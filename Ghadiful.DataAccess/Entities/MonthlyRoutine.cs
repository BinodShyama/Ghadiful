using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class MonthlyRoutine
{
    public long Id { get; set; }

    public long RoutineId { get; set; }

    public int ShiftId { get; set; }

    public int Nth { get; set; }

    public int Value { get; set; }

    public string Type { get; set; } = null!;

    public int Specificity { get; set; }

    public virtual Routine Routine { get; set; } = null!;

    public virtual Shift Shift { get; set; } = null!;
}
