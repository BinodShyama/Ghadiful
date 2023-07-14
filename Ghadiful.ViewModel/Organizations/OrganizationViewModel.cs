using Ghadiful.ViewModel.Employees;

namespace Ghadiful.ViewModel.Organizations
{
    public class OrganizationViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Parent { get; set; }

        public int? ParentId { get; set; }
        public bool? IsActive { get; set; }

        public string? Address { get; set; }

        public string? Ip4address { get; set; }
        public string? Ip6address { get; set; }
        public string? Geolocation { get; set; }
        public bool HasChild { get; set; } = false;
         public List<OrganizationTagViewModel> Tags { get; set; } = new List<OrganizationTagViewModel>();
    }
}
