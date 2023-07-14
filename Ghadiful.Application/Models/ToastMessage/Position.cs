using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Ghadiful.Application.Models.ToastMessage
{
	public enum Position
	{
		[Description("top-0 start-0")]
		TopLeft,
		[Description("top-0 start-50 translate-middle-x")]
		TopCenter,
		[Description("top-0 end-0")]
		TopRight,
		[Description("toast-top-right")]
		MiddleLeft,
		[Description("top-50 start-50 translate-middle")]
		MiddleCenter,
		[Description("top-50 end-0 translate-middle-y")]
		MiddleRight,
		[Description("bottom-0 start-0")]
		BottomLeft,
		[Description("bottom-0 start-50 translate-middle-x")]
		BottomCenter,
		[Description("toast-bottom-right")]
		BottomRight,

	}
}
