﻿using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class UserClaim
{
    public int Id { get; set; }

    public string UserId { get; set; } = null!;

    public string? ClaimType { get; set; }

    public string? ClaimValue { get; set; }

    public virtual User User { get; set; } = null!;
}
