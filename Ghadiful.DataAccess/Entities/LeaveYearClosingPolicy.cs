using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class LeaveYearClosingPolicy
{
    public long Id { get; set; }

    public long LeaveId { get; set; }

    public long? EligibleGroupId { get; set; }

    public decimal MaxCarryForwardable { get; set; }

    public decimal MaxEncashable { get; set; }

    public virtual EmployeeGroup? EligibleGroup { get; set; }

    public virtual Leave Leave { get; set; } = null!;
}
