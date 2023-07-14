using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class LeaveTaken
{
    public long Id { get; set; }

    public long LeaveId { get; set; }

    public long EmployeeId { get; set; }

    public int StartDate { get; set; }

    public int EndDate { get; set; }

    public decimal DurationEachDay { get; set; }

    public int? WhichSlot { get; set; }

    public decimal GrossDuration { get; set; }

    public decimal NetDuration { get; set; }

    public string Remarks { get; set; } = null!;

    public int ApprovalStatusId { get; set; }

    public long? ApprovalGroupId { get; set; }

    public virtual Group? ApprovalGroup { get; set; }

    public virtual ApprovalStatus ApprovalStatus { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;

    public virtual Calendar EndDateNavigation { get; set; } = null!;

    public virtual Leave Leave { get; set; } = null!;

    public virtual Calendar StartDateNavigation { get; set; } = null!;
}
