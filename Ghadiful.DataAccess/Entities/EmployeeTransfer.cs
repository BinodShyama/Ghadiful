using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class EmployeeTransfer
{
    public long Id { get; set; }

    public long EmployeeId { get; set; }

    public int? OrganizationId { get; set; }

    public int StartDate { get; set; }

    public int EndDate { get; set; }

    public virtual Employee Employee { get; set; } = null!;

    public virtual Calendar EndDateNavigation { get; set; } = null!;

    public virtual Organization? Organization { get; set; }

    public virtual Calendar StartDateNavigation { get; set; } = null!;
}
