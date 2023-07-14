namespace Ghadiful.ViewModel.Holiday
{
    public class HolidayEventEditViewModel
    {
        public int Id { get; set; }
        public string Subject { get; set; } = null!;
        public int? HolidayId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public List<int> Groups { get; set; } = null!;
        public bool IsAllDay { get; set; } = true;
        public string RequestType { get; set; } = null!;
    }

}
