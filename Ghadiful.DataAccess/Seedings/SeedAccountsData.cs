using Ghadiful.DataAccess.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace Ghadiful.DataAccess.Seedings
{
    public static class SeedAccountsData
    {
        public static async Task Initialize(IServiceProvider _IServiceProvider)
        {
            ApplicationDbContext context = _IServiceProvider.GetRequiredService<ApplicationDbContext>();
            var userManager = _IServiceProvider.GetRequiredService<UserManager<Entities.User>>();

            //context.Database.EnsureCreated();

            var _user = await userManager.FindByEmailAsync("admin@yopmail.com");
            if (_user == null)
            {
                Entities.User user = new Entities.User()
                {
                    UserName = "admin",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    //CreatedAt = DateTime.Now,
                    //UpdatedAt = DateTime.Now,
                    Email = "admin@yopmail.com",
                    EmailConfirmed = true,
                    //IsAdmin = true,
                    Status = true,
                    PhoneNumber = "0000000000",
                    PhoneNumberConfirmed = true,
                    //CreatedBy = "Seeding",
                    //UpdatedBy = "Seeding",
                    Type="user"
                };
                var r = await userManager.CreateAsync(user, "Abcd1#");
                if (r.Succeeded)
                {

                }
            }
            _user = await userManager.FindByEmailAsync("test@yopmail.com");
            if (_user == null)
            {
                Entities.User user = new Entities.User()
                {
                    UserName = "test",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    //CreatedAt = DateTime.Now,
                    //UpdatedAt = DateTime.Now,
                    Email = "test@yopmail.com",
                    EmailConfirmed = true,
                    //IsAdmin = false,
                    Status = true,
                    PhoneNumber = "00000000",
                    PhoneNumberConfirmed = true,
                    //CreatedBy = "Seeding",
                    //UpdatedBy = "Seeding",
                    Type="user"
                };
                var r = await userManager.CreateAsync(user, "Abcd1#");
                if (r.Succeeded)
                {

                }
            }
        }
    }
}
