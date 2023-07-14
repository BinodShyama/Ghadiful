using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class CalendarMonth
{
    public int Id { get; set; }

    public int YearId { get; set; }

    public int Month { get; set; }

    public int TotalDays { get; set; }

    public virtual ICollection<Calendar> Calendars { get; set; } = new List<Calendar>();

    public virtual CalendarYear Year { get; set; } = null!;
}
