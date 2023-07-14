using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class ApprovalHistory
{
    public long Id { get; set; }

    public string RecordTable { get; set; } = null!;

    public long RecordId { get; set; }

    public int CalendarId { get; set; }

    public string UserId { get; set; } = null!;

    public int StatusId { get; set; }

    public string Remarks { get; set; } = null!;

    public virtual Calendar Calendar { get; set; } = null!;

    public virtual ApprovalStatus Status { get; set; } = null!;

   // public virtual User2 User { get; set; } = null!;
}
