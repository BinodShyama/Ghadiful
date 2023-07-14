using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class EmployeeTag
{
    public long Id { get; set; }

    public long EmployeeId { get; set; }

    public string Name { get; set; } = null!;

    public string Value { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;
}
