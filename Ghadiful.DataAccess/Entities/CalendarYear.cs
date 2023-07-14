using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class CalendarYear
{
    public int Id { get; set; }

    public int Year { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public virtual ICollection<CalendarMonth> CalendarMonths { get; set; } = new List<CalendarMonth>();
}
