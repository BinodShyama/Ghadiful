using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Ghadiful.ViewModel.Shifts
{
    public class ShiftViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="Please enter shift name.")]
        [Remote("IsDuplicateName","Shift",ErrorMessage ="Duplicate shift name")]
        [StringLength(100)]
        public string Name { get; set; } = null!;
        [StringLength(30)]
        [Required(ErrorMessage ="Please enter shift code.")]
        [Remote("IsDuplicateCode", "Shift", ErrorMessage = "Duplicate shift code")]
        public string Code { get; set; } = null!;
        [Display(Name = "Start Time")]
        public TimeSpan? StartTime { get; set; }
        [Display(Name = "End Time")]
        public TimeSpan? EndTime { get; set; }
        public bool AcrossMidnight { get; set; }
        public TimeSpan? Duration { get; set; }
        [StringLength(30)]
        [Required]
        public string Type { get; set; } = null!;

    }
}


