using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ghadiful.DataAccess.Entities;

public partial class Role : IdentityRole<string>
{  
    public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();

    public virtual ICollection<UserAccess> UserAccesses { get; set; } = new List<UserAccess>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
