using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class Organization
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int? ParentId { get; set; }

    public bool? IsActive { get; set; }

    public string? Address { get; set; }

    public byte[]? Ip4address { get; set; }

    public byte[]? Ip6address { get; set; }

    public virtual ICollection<CheckInOutLog> CheckInOutLogCinOrganizations { get; set; } = new List<CheckInOutLog>();

    public virtual ICollection<CheckInOutLog> CheckInOutLogCoutOrganizations { get; set; } = new List<CheckInOutLog>();

    public virtual ICollection<CheckInOutLog> CheckInOutLogEmpOrganizations { get; set; } = new List<CheckInOutLog>();

    public virtual ICollection<EmployeeTransfer> EmployeeTransfers { get; set; } = new List<EmployeeTransfer>();

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();

    public virtual ICollection<Organization> InverseParent { get; set; } = new List<Organization>();

    public virtual ICollection<ManualLog> ManualLogs { get; set; } = new List<ManualLog>();

    public virtual ICollection<OrganizationGroup> OrganizationGroups { get; set; } = new List<OrganizationGroup>();

    public virtual ICollection<OrganizationTag> OrganizationTags { get; set; } = new List<OrganizationTag>();

    public virtual Organization? Parent { get; set; }

    public virtual ICollection<TrackerAssignment> TrackerAssignments { get; set; } = new List<TrackerAssignment>();
}
