using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class OrganizationTag
{
    public long Id { get; set; }

    public int OrganizationId { get; set; }

    public string Name { get; set; } = null!;

    public string Value { get; set; } = null!;

    public virtual Organization Organization { get; set; } = null!;
}
