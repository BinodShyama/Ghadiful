using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ghadiful.Application.Helper.ToastMessage
{
	public interface IActivity
	{
		IStatus Status { get; }
	}
	public class Activity : IActivity
	{
		private readonly IStatus _status;
		private readonly IHttpContextAccessor _httpContextAccessor;
		public Activity(IHttpContextAccessor httpContextAccessor, IStatus status)
		{
			_httpContextAccessor = httpContextAccessor;
			_status = status;
		}

		public IStatus Status => _status;
	}
}
