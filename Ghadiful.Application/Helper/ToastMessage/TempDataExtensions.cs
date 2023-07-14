using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ghadiful.Application.Helper.ToastMessage
{
	public static class TempDataExtensions
	{
		/// <summary>
		/// Put.
		/// </summary>
		/// <param name="tempData">The temp data.</param>
		/// <param name="key">The key.</param>
		/// <param name="value">The value.</param>
		/// <typeparam name="T"></typeparam>
		public static void Put<T>(this ITempDataDictionary tempData, string key, T value)
		{
			tempData[key] = JsonConvert.SerializeObject(value);
		}
		/// <summary>
		/// Get.
		/// </summary>
		/// <param name="tempData">The temp data.</param>
		/// <param name="key">The key.</param>
		/// <typeparam name="T"></typeparam>
		public static T Get<T>(this ITempDataDictionary tempData, string key)
		{
			return tempData.TryGetValue(key, out object value) ? JsonConvert.DeserializeObject<T>(value.ToString()) : default;
		}
	}
}
