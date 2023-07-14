using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class Position
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int Level { get; set; }

    public virtual ICollection<EmployeePosition> EmployeePositions { get; set; } = new List<EmployeePosition>();

    public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();

    public virtual ICollection<PositionTag> PositionTags { get; set; } = new List<PositionTag>();
}
