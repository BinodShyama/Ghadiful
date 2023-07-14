using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class Break
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;

    public virtual ICollection<ShiftBreak> ShiftBreaks { get; set; } = new List<ShiftBreak>();
}
