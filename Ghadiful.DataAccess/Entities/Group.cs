using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class Group
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string Type { get; set; } = null!;

    public long? Hierarchy { get; set; }

    public string? Tags { get; set; }

    public virtual ICollection<Approver> Approvers { get; set; } = new List<Approver>();

    public virtual ICollection<EmployeeGroup> EmployeeGroups { get; set; } = new List<EmployeeGroup>();

    public virtual ICollection<HolidayCalendar> HolidayCalendars { get; set; } = new List<HolidayCalendar>();

    public virtual ICollection<LeaveTaken> LeaveTakens { get; set; } = new List<LeaveTaken>();

    public virtual ICollection<ManualLog> ManualLogs { get; set; } = new List<ManualLog>();

    public virtual ICollection<Notice> Notices { get; set; } = new List<Notice>();

    public virtual ICollection<OrganizationGroup> OrganizationGroups { get; set; } = new List<OrganizationGroup>();

    public virtual ICollection<ScheduleOverride> ScheduleOverrides { get; set; } = new List<ScheduleOverride>();

    public virtual ICollection<Schedule> Schedules { get; set; } = new List<Schedule>();

    public virtual ICollection<UserAccess> UserAccesses { get; set; } = new List<UserAccess>();
}
