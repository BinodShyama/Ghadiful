//using Ghadiful.Application.Helper.ToastMessage;
//using Ghadiful.Application.Models.ToastMessage;
//using Ghadiful.ViewModel.Users;
//using Microsoft.AspNetCore.Mvc;

//namespace Ghadiful.Web.Controllers
//{
//    public class UserController : Controller
//    {
//        private readonly IActivity _activity;

//        public UserController(IActivity activity)
//        {
//            _activity = activity;
//        }

//        public IActionResult Index()
//        {
//            return View();
//        }
//        [HttpGet]
//        public IActionResult Create()
//        {
//            return View();
//        }
//        [HttpPost]
//        public async Task<IActionResult> Create(UserViewModel    model)
//        {
//            if (ModelState.IsValid)
//            {
//                var result = await _mediator.Send(new CreateUserCommand { userCreateDto = model });
//                if (result.Status)
//                {
//                    _activity.Status.Show(StatusType.Success, string.Join(",", result.Messages));
//                    return Redirect("/user/index");
//                }
//                else
//                {
//                    _activity.Status.Show(StatusType.Error, string.Join(",", result.Messages));
//                    return View(model);
//                }
//            }
//            else
//            {
//                _activity.Status.Show(StatusType.Error, string.Join("\n", ModelState.Values.SelectMany(c => c.Errors).Select(e => e.ErrorMessage).ToList()));
//                return View(model);
//            }
//        }

//        public async Task<IActionResult> EditAsync(string id)
//        {
//            var result = await _mediator.Send(new GetUserByIdQuery { id = id });
//            return View(result);
//        }

//        [HttpPost]
//        public async Task<IActionResult> Edit(string id, UserUpdateDto model)
//        {
//            {
//                if (ModelState.IsValid)
//                {
//                    var result = await _mediator.Send(new UpdateUserCommand { userUpdateDto = model, id = id });
//                    _activity.Status.Show(result.Status ? StatusType.Success : StatusType.Error, string.Join(",", result.Messages));
//                    return Redirect("/user/index");
//                }
//                else
//                {
//                    _activity.Status.Show(StatusType.Error, string.Join("\n", ModelState.Values.SelectMany(c => c.Errors).Select(e => e.ErrorMessage).ToList()));
//                    return View(model);
//                }
//            }
//        }

//        public async Task<IActionResult> ViewAsync(string id)
//        {
//            var result = await _mediator.Send(new GetUserByIdQuery { id = id });
//            return View(result);
//        }
//    }
//}
