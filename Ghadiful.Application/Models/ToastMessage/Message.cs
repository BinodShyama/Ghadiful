using System;
using System.Collections.Generic;
using System.Text;

namespace Ghadiful.Application.Models.ToastMessage
{
	public class Message
	{
		public string Type { get; }
		public string Text { get; }
		public bool Dismissable { get; }
		public string Position { get; }
		/// <summary>
		/// Initializes a new instance of the <see cref="Message"/> class.
		/// </summary>
		/// <param name="type">The type.</param>
		/// <param name="text">The text.</param>
		/// <param name="dismissable">The dismissable.</param>
		public Message(string type, string text, bool dismissable, string position)
		{
			Type = type;
			Text = text;
			Dismissable = dismissable;
			Position = position;
		}
	}
}
