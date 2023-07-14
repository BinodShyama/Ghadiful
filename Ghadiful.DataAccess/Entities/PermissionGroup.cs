using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class PermissionGroup
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Permission> Permissions { get; set; } = new List<Permission>();
}
