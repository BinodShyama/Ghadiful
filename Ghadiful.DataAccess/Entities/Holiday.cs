using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class Holiday
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<HolidayCalendar> HolidayCalendars { get; set; } = new List<HolidayCalendar>();
}
