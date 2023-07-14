using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ghadiful.DataAccess.Entities;

public partial class User : IdentityUser<string>
{   
    public bool Status { get; set; }

    public string Type { get; set; } = null!;

    public long? EmployeeId { get; set; }    

    public int? LastReadNoticeDate { get; set; }

    public virtual ICollection<ApprovalHistory> ApprovalHistories { get; set; } = new List<ApprovalHistory>();

    public virtual Employee? Employee { get; set; }

    public virtual Calendar? LastReadNoticeDateNavigation { get; set; }

    public virtual ICollection<UserAccess> UserAccesses { get; set; } = new List<UserAccess>();

    public virtual ICollection<UserClaim> UserClaims { get; set; } = new List<UserClaim>();

    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();
}
