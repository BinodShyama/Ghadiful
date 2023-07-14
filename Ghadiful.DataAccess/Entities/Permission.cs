using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class Permission
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public int PermissionGroupId { get; set; }

    public virtual PermissionGroup PermissionGroup { get; set; } = null!;

    public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
}
