using AutoMapper;
using Ghadiful.Application.Abstractions;
using Ghadiful.DataAccess;
using Ghadiful.DataAccess.Entities;
using Ghadiful.ViewModel;
using Ghadiful.ViewModel.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Ghadiful.Application.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<DataAccess.Entities.User> _userManager;
        private readonly ILogger<UserService> _logger;
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public UserService(UserManager<DataAccess.Entities.User> userManager, ILogger<UserService> logger, ApplicationDbContext dbContext, IMapper mapper)
        {
            _userManager = userManager;
            _logger = logger;
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<Response<UserViewModel>> Create(UserViewModel model)
        {
            try
            {
                var user = new DataAccess.Entities.User()
                {
                    Status = true,
                    Email = model.Email,
                    UserName = model.UserName,
                    EmailConfirmed = true,
                    Type = "User"
                };
                await _userManager.CreateAsync(user, model.Password);
                await _dbContext.SaveChangesAsync();
                return new Response<UserViewModel> { Data = model, Message = "User successfully saved.", Status = true };
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new Response<UserViewModel> { Data = model, Message = "Fail to save user.", Status = false };
            }
        }

        public async Task<Response<bool>> Delete(string id)
        {
            try
            {
                await _dbContext.Users.Where(c => c.Id == id).ExecuteDeleteAsync();
                return new Response<bool> { Data = true, Message = "Deleted use successfully", Status = true };
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new Response<bool> { Data = false, Status = false, Message = $"Fail to delete user.{ex.Message}" };
            }
        }


        public async Task<List<UserViewModel>> GetAll()
        {
            return _mapper.Map<List<UserViewModel>>(await _dbContext.Users.ToListAsync());
        }
        public async Task<UserViewModel> Get(string id)
        {
            return _mapper.Map<UserViewModel>(await _dbContext.Users.FindAsync(id));
        }

        public async Task<Response<UserViewModel>> Update(UserViewModel model, string id)
        {
            try
            {
                var user = await _dbContext.Users.FindAsync(id);// .User.Where(c => c.Id == request.id).FirstOrDefaultAsync();
                if (user != null)
                {
                    user.UserName = model.UserName;
                    if (!string.IsNullOrEmpty(model.Password))
                    {
                        var newPassword = _userManager.PasswordHasher.HashPassword(user, model.Password);
                        user.PasswordHash = newPassword;
                    }

                    var res = await _userManager.UpdateAsync(user);

                    await _dbContext.SaveChangesAsync();
                    return new Response<UserViewModel> { Data = model, Message = "User update succssfully.", Status = true };
                }
                else
                {
                    _logger.LogInformation("User does not exist to update.");
                    return new Response<UserViewModel> { Data = model, Message = "User not found to update.", Status = false };
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new Response<UserViewModel> { Data = model, Message = "An error occured.", Status = false };
            }
        }

    }
}
