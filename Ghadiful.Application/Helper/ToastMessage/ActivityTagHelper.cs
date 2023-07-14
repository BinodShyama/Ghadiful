using Ghadiful.Application.Helper.ToastMessage;
using Ghadiful.Application.Models.ToastMessage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Web;

namespace Ghadiful.Application.Helper.ToastMessage
{
	[HtmlTargetElement("alert")]
	public class ActivityTagHelper : TagHelper
	{
		/// <summary>
		/// The temp data.
		/// </summary>
		private ITempDataDictionary tempData;
		/// <summary>
		/// The i http context accessor.
		/// </summary>
		private IHttpContextAccessor iHttpContextAccessor;
		//private const string HtmlStandardTemplate =
		//  "<div class=\"position-fixed bottom-0 end-0 p-3 z-50\"><div class=\"toast align-items-center text-white bg-primary border-0 {0} fade show\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\"><div class=\"d-flex\"><div class=\"toast-body\">" +
		//      "{1}" +
		//  "</div><button type=\"button\" class=\"btn-close btn-close-white m-auto me-2\" data-dismiss=\"toast\" aria-label=\"Close\"></button></div></div></div>";


		private const string HtmlStandardTemplate = "<div id='toast-container' class='{0}'><div class='toast {1}' aria-live='polite' style=''><div class='toast-message'>{2}</div></div></div>";

		//"<div class=\"position-fixed {0} p-3 z-50\"><div class=\"toast align-items-center {1} fade text-white hide\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\">" +
		//  "<div class=\"d-flex\">" +
		//    "<div class=\"toast-body\">{2}</div>" +
		//    "<button type = \"button\" class=\"btn-close me-2 m-auto btn-close-white\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>" +
		//  "</div>" +
		//"</div></div>\"";
		/// <summary>
		/// The i temp data dictionary factory.
		/// </summary>
		private ITempDataDictionaryFactory iTempDataDictionaryFactory;
		public ActivityTagHelper(ITempDataDictionaryFactory factory, IHttpContextAccessor contextAccessor, ITempDataDictionary tempData)
		{
			iTempDataDictionaryFactory = factory;
			iHttpContextAccessor = contextAccessor;
			this.tempData = tempData;
		}

		public override void Process(TagHelperContext context, TagHelperOutput output)
		{
			tempData = iTempDataDictionaryFactory.GetTempData(iHttpContextAccessor.HttpContext);
			var messages = tempData.Get<Queue<Message>>(Constants.Key) ?? new Queue<Message>();
			output.TagName = null;
			output.TagMode = TagMode.StartTagAndEndTag;
			if (messages.Count > 0)
			{
				while (messages.Count > 0)
				{
					var message = messages.Dequeue();

					output.PreContent.SetHtmlContent(string.Format(HtmlStandardTemplate, message.Position, message.Type, message.Text));
					break;
				}
			}
			else
			{
				output.PreContent.SetHtmlContent("");
			}
		}
	}
}
