using Ghadiful.DataAccess.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess;

public partial class User2 : IdentityUser<string>
{
    public override string Id { get; set; }= Guid.NewGuid().ToString();

    //public string UserName { get; set; } = null!;

    //public string PasswordHash { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string Status { get; set; } = null!;

    //public string? PhoneNumber { get; set; }

    //public bool PhoneNumberVerified { get; set; }

    //public string? Email { get; set; }

    //public bool EmailVerified { get; set; }

    //public bool TwoFactorEnabled { get; set; }

    public long? EmployeeId { get; set; }

   // public virtual ICollection<ApprovalHistory> ApprovalHistories { get; set; } = new List<ApprovalHistory>();

    public virtual Employee? Employee { get; set; }

    public virtual ICollection<UserAccess> UserAccesses { get; set; } = new List<UserAccess>();
}
