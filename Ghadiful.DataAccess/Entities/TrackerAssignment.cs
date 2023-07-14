using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class TrackerAssignment
{
    public int Id { get; set; }

    public int TrackerId { get; set; }

    public int OrganizationId { get; set; }

    public int TrackingStartDate { get; set; }

    public int TrackingEndDate { get; set; }

    public virtual Organization Organization { get; set; } = null!;

    public virtual BiometricTracker Tracker { get; set; } = null!;

    public virtual Calendar TrackingEndDateNavigation { get; set; } = null!;

    public virtual Calendar TrackingStartDateNavigation { get; set; } = null!;
}
