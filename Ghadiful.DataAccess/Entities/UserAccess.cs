using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class UserAccess
{
    public long Id { get; set; }

    public string UserId { get; set; } = null!;

    public long GroupId { get; set; }

    public string RoleId { get; set; } = null!;

    public virtual Group Group { get; set; } = null!;

    public virtual Role Role { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
