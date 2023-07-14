using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class Leave
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;

    public string PayrollCode { get; set; } = null!;

    public string Unit { get; set; } = null!;

    public string Category { get; set; } = null!;

    public decimal MaintainMinBalance { get; set; }

    public decimal MaintainMaxBalance { get; set; }

    public bool? Paid { get; set; }

    public virtual ICollection<LeaveBalance> LeaveBalances { get; set; } = new List<LeaveBalance>();

    public virtual ICollection<LeaveEarningPolicy> LeaveEarningPolicies { get; set; } = new List<LeaveEarningPolicy>();

    public virtual ICollection<LeaveTakenPolicy> LeaveTakenPolicies { get; set; } = new List<LeaveTakenPolicy>();

    public virtual ICollection<LeaveTaken> LeaveTakens { get; set; } = new List<LeaveTaken>();

    public virtual ICollection<LeaveYearClosingPolicy> LeaveYearClosingPolicies { get; set; } = new List<LeaveYearClosingPolicy>();
}
