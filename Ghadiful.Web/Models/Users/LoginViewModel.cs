using System.ComponentModel.DataAnnotations;

namespace Ghadiful.Web.Models.Users
{
	public class LoginViewModel
	{
		[Display(Name = "Email Address")]
		[Required]
		[StringLength(40, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 3)]
		public string UserName { get; set; } = string.Empty;

		[RegularExpression(@"(?=^.{5,15}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?!.*\s).*$", ErrorMessage = "Password should have A-Z, a-z, 0-9 and some special characters #,!,@ etc..")]
		[Required(ErrorMessage = "Please Enter Password.")]
		[StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
		[DataType(DataType.Password)]
		[Display(Name = "Password")]
		public string Password { get; set; } = string.Empty;

		public bool RememberMe { get; set; }
	}
}
