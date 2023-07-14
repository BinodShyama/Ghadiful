using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class OrganizationGroup
{
    public long Id { get; set; }

    public long GroupId { get; set; }

    public int OrganizationId { get; set; }

    public virtual Group Group { get; set; } = null!;

    public virtual Organization Organization { get; set; } = null!;
}
