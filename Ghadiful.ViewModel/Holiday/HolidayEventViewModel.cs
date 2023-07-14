namespace Ghadiful.ViewModel.Holiday
{
    public class HolidayEventViewModel
    {
        public int Id { get; set; }
        public string Subject { get; set; } = null!;
        public int? HolidayId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public List<int> Groups { get; set; } = null!;
        public string Group { get; set; } = null!;
        public bool IsAllDay { get; set; } = true;
    }

}
