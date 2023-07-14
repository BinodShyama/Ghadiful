using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class ManualLog
{
    public long Id { get; set; }

    public int CalendarId { get; set; }

    public long EmployeeId { get; set; }

    public TimeSpan Timestamp { get; set; }

    public string InOutMode { get; set; } = null!;

    public int InOutOrganizationId { get; set; }

    public string Remarks { get; set; } = null!;

    public int ApprovalStatusId { get; set; }

    public long? ApproverGroupId { get; set; }

    public virtual ApprovalStatus ApprovalStatus { get; set; } = null!;

    public virtual Group? ApproverGroup { get; set; }

    public virtual Calendar Calendar { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;

    public virtual Organization InOutOrganization { get; set; } = null!;
}
