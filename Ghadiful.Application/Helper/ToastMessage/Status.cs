using Ghadiful.Application.Extensions;
using Ghadiful.Application.Helper.ToastMessage;
using Ghadiful.Application.Models.ToastMessage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace Ghadiful.Application.Helper.ToastMessage
{
	public interface IStatus
	{
		void Show(StatusType type, string message, bool dismissable = false, Position position = Position.BottomRight);
	}
	public class Status : IStatus
	{
		private ITempDataDictionary tempData;
		public Status(ITempDataDictionaryFactory factory, IHttpContextAccessor contextAccessor)
		{
			tempData = factory.GetTempData(contextAccessor.HttpContext);

		}
		public void Show(StatusType type, string message, bool dismissable = false, Position position = Position.BottomRight)
		{
			var messages = tempData.Get<Queue<Message>>(Constants.Key) ?? new Queue<Message>();
			messages.Enqueue(new Message(type.GetEnumDescription(), message, dismissable, position.GetEnumDescription()));
			tempData.Put(Constants.Key, messages);
		}
	}
}
