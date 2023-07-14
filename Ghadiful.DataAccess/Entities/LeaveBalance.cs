using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class LeaveBalance
{
    public long Id { get; set; }

    public long EmployeeId { get; set; }

    public long LeaveId { get; set; }

    public string Source { get; set; } = null!;

    public int PlusOrMinus { get; set; }

    public decimal Duration { get; set; }

    public int EffectiveDate { get; set; }

    public int? ExpiryDate { get; set; }

    public string? Remarks { get; set; }

    public long TransactionId { get; set; }

    public virtual Calendar EffectiveDateNavigation { get; set; } = null!;

    public virtual Employee Employee { get; set; } = null!;

    public virtual Calendar? ExpiryDateNavigation { get; set; }

    public virtual Leave Leave { get; set; } = null!;
}
