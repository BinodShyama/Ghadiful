using Ghadiful.DataAccess.Entities;
using Ghadiful.Web.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Ghadiful.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly SignInManager<DataAccess.Entities.User> _signInManager;
        private readonly UserManager<DataAccess.Entities.User> _userManager;
        private readonly ILogger _logger;
        public AccountController(SignInManager<DataAccess.Entities.User> signInManager, UserManager<DataAccess.Entities.User> userManager, ILogger<AccountController> logger)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _logger = logger;
        }


        [AllowAnonymous]
        public virtual async Task<IActionResult> Login()
        {
            return await Task.Run(() => View());
        }


        public async Task<IActionResult> Logout()
        {
             await _signInManager.SignOutAsync();
            return await Task.Run(() => View("login"));
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel data, string? returnUrl)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _signInManager.PasswordSignInAsync(data.UserName!, data.Password, data.RememberMe, lockoutOnFailure: false);
                    if (result.Succeeded)
                    {
                        _logger.LogInformation($"{data.UserName} logged in. Datetime:-{DateTime.Now}");
                        return Redirect("/dashboard");
                    }
                    else
                    {

                        ModelState.AddModelError("LoginError", "Username or password is incorrect.");
                        return await Task.Run(() => View(data));
                    }
                }
                else
                {
                    ModelState.AddModelError("LoginError", "Username or password is incorrect.");
                    return await Task.Run(() => View(data));
                }
            }
            catch (Exception ex)
            {
                //ModelState.AddModelError("LoginError", ex.ToString());
                ModelState.AddModelError("LoginError", "Username or password is incorrect.");
                return await Task.Run(() => View(data));
            }


        }

       
    }
}
