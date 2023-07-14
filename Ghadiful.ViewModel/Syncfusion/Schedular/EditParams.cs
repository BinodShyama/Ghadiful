namespace Ghadiful.ViewModel.Syncfusion.Schedular
{
    public class EditParams
    {
        public string key { get; set; } = null!;
        public string action { get; set; } = null!;
        public List<ScheduleEvent>? added { get; set; }
        public List<ScheduleEvent>? changed { get; set; }
        public List<ScheduleEvent>? deleted { get; set; }
        public ScheduleEvent value { get; set; } = null!;
    }

    public class Params
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CustomStart { get; set; }
        public DateTime CustomEnd { get; set; }
    }
}
