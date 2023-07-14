namespace Ghadiful.ViewModel.Syncfusion.Schedular
{
    public class ScheduleEvent
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string StartTimezone { get; set; }
        public string EndTimezone { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public bool IsAllDay { get; set; }
        public string RecurrenceID { get; set; }
        public string RecurrenceRule { get; set; }
        public string RecurrenceException { get; set; }
    }

    public class HolidayData
    {
        public int Id { get; set; }
        public string Subject { get; set; } = null!;
        public int? HoliDayId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public List<int> Groups { get; set; } = null!;
    }
}
