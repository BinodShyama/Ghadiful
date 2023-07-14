using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class RolePermission
{
    public long Id { get; set; }

    public string RoleId { get; set; } = null!;

    public long PermissionId { get; set; }

    public virtual Permission Permission { get; set; } = null!;

    public virtual Role Role { get; set; } = null!;
}
