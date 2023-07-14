namespace Ghadiful.ViewModel.Shifts
{
    public class ShiftActionViewModel
    {
        public ShiftViewModel Shift { get; set; } = null!;
        public string Message { get; set; } = "";
        public bool Status { get; set; }
    }
}
