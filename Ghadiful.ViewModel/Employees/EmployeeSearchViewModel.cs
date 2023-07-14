namespace Ghadiful.ViewModel.Employees
{
    public class EmployeeSearchViewModel
    {
        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public string OfficialNumber { get; set; } = null!;

        public long DeviceEnrollNumber { get; set; }

        public string? Organization { get; set; }
    }
}
