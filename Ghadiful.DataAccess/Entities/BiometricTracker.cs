using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class BiometricTracker
{
    public int Id { get; set; }

    public string Ipaddress { get; set; } = null!;

    public int PortNumber { get; set; }

    public int? CommPassword { get; set; }

    public string Brand { get; set; } = null!;

    public string? Model { get; set; }

    public string VerifyModes { get; set; } = null!;

    public int? TemplateVersion { get; set; }

    public string? SerialNumber { get; set; }

    public virtual ICollection<BiometricLog> BiometricLogs { get; set; } = new List<BiometricLog>();

    public virtual ICollection<TrackerAssignment> TrackerAssignments { get; set; } = new List<TrackerAssignment>();
}
