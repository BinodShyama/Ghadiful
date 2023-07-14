using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class LeaveEarningPolicy
{
    public long Id { get; set; }

    public long LeaveId { get; set; }

    public long? EligibleGroupId { get; set; }

    public string Frequency { get; set; } = null!;

    public string Expiry { get; set; } = null!;

    public string VaryBy { get; set; } = null!;

    public decimal DurationOrEarningRatio { get; set; }

    public bool RoundOffDecimal { get; set; }

    public decimal MaxDurationPerEarning { get; set; }

    public virtual EmployeeGroup? EligibleGroup { get; set; }

    public virtual Leave Leave { get; set; } = null!;
}
