using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class Approver
{
    public long Id { get; set; }

    public int StatusId { get; set; }

    public long GroupId { get; set; }

    public virtual Group Group { get; set; } = null!;

    public virtual ApprovalStatus Status { get; set; } = null!;
}
