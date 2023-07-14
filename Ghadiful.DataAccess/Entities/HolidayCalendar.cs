namespace Ghadiful.DataAccess.Entities;

public partial class HolidayCalendar
{
    public long Id { get; set; }

    public int HolidayId { get; set; }

    public long GroupId { get; set; }

    public int CalendarId { get; set; }

    public long HolidayGroupId { get; set; }

    public virtual Calendar Calendar { get; set; } = null!;

    public virtual Group Group { get; set; } = null!;

    public virtual Holiday Holiday { get; set; } = null!;
}
