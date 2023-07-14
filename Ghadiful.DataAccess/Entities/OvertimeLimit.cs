using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class OvertimeLimit
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Code { get; set; } = null!;

    public decimal MinHour { get; set; }

    public decimal MaxHour { get; set; }

    public decimal BeforeShift { get; set; }

    public decimal AfterShift { get; set; }

    public decimal MaxHourPerDay { get; set; }

    public decimal MaxHourPerWeek { get; set; }

    public decimal MaxHourPerMonth { get; set; }

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();

    public virtual ICollection<OvertimeLimitOverride> OvertimeLimitOverrides { get; set; } = new List<OvertimeLimitOverride>();
}
