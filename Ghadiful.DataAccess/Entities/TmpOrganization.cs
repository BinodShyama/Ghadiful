using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class TmpOrganization
{
    public long? BranchId { get; set; }

    public string? BranchName { get; set; }

    public long? UnderBranch { get; set; }
}
