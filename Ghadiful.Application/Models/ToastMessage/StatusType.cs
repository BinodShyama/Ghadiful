using System.ComponentModel;

namespace Ghadiful.Application.Models.ToastMessage
{
    public enum StatusType
	{
		[Description("bg-danger")]
		Error = 0,
		[Description("toast-info")]
		Success = 1,
		[Description("bg-warning")]
		Warning = 2,
	}
}
