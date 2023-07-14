namespace Ghadiful.ViewModel.Employees
{
    public class EmployeeViewModel
    {
        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public string OfficialNumber { get; set; } = null!;

        public long DeviceEnrollNumber { get; set; }

        public string PayrollNumber { get; set; } = null!;

        public string Status { get; set; } = null!;

        public string? PhoneNumber { get; set; }

        public bool PhoneNumberVerified { get; set; }

        public string? Email { get; set; }

        public bool EmailVerified { get; set; }

        public int LastOrganizationId { get; set; }

        public DateTime LastTransferOrJoinedDate { get; set; }

        public int LastPositionId { get; set; }

        public DateTime LastPromotionOrJoinedDate { get; set; }

        public string? Organization { get; set; } 
        public string? Position { get; set; }         

        //public virtual ICollection<EmployeeGroup> EmployeeGroups { get; set; } = new List<EmployeeGroup>();

        //public virtual ICollection<EmployeePosition> EmployeePositions { get; set; } = new List<EmployeePosition>();

        public List<EmployeeTagViewModel> Tags { get; set; } = new List<EmployeeTagViewModel>();

        //public virtual ICollection<EmployeeTransfer> EmployeeTransfers { get; set; } = new List<EmployeeTransfer>();

        //public virtual Organization LastOrganization { get; set; } = null!;

        //public virtual Position LastPosition { get; set; } = null!;

        public int OvertimeLimitId { get; set; }
        public string OvertimeLimit { get; set; }

        public int CheckInStartMinute { get; set; }

        public int CheckOutEndMinute { get; set; }

        public int CheckInGraceMinute { get; set; }
        public int CheckOutGraceMinute { get; set; }

         public int Level { get; set; }      
    }
}
