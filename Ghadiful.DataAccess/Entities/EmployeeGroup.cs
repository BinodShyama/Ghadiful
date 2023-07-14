using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class EmployeeGroup
{
    public long Id { get; set; }

    public long GroupId { get; set; }

    public long EmployeeId { get; set; }

    public virtual Employee Employee { get; set; } = null!;

    public virtual Group Group { get; set; } = null!;

    public virtual ICollection<LeaveEarningPolicy> LeaveEarningPolicies { get; set; } = new List<LeaveEarningPolicy>();

    public virtual ICollection<LeaveTakenPolicy> LeaveTakenPolicies { get; set; } = new List<LeaveTakenPolicy>();

    public virtual ICollection<LeaveYearClosingPolicy> LeaveYearClosingPolicies { get; set; } = new List<LeaveYearClosingPolicy>();
}
