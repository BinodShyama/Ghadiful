using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class ApprovalStatus
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int? ParentId { get; set; }

    public int? BackFlowId { get; set; }

    public int ProgressPercent { get; set; }

    public string? Sentiment { get; set; }

    public virtual ICollection<ApprovalHistory> ApprovalHistories { get; set; } = new List<ApprovalHistory>();

    public virtual ICollection<Approver> Approvers { get; set; } = new List<Approver>();

    public virtual ApprovalStatus? BackFlow { get; set; }

    public virtual ICollection<ApprovalStatus> InverseBackFlow { get; set; } = new List<ApprovalStatus>();

    public virtual ICollection<ApprovalStatus> InverseParent { get; set; } = new List<ApprovalStatus>();

    public virtual ICollection<LeaveTaken> LeaveTakens { get; set; } = new List<LeaveTaken>();

    public virtual ICollection<ManualLog> ManualLogs { get; set; } = new List<ManualLog>();

    public virtual ApprovalStatus? Parent { get; set; }
}
