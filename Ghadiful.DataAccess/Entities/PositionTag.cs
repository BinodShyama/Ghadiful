using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class PositionTag
{
    public long Id { get; set; }

    public int PositionId { get; set; }

    public string Name { get; set; } = null!;

    public string Value { get; set; } = null!;

    public virtual Position Position { get; set; } = null!;
}
