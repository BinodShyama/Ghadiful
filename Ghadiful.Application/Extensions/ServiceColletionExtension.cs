using Ghadiful.Application.Abstractions;
using Ghadiful.Application.Services;
using Ghadiful.DataAccess.Seedings;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace Ghadiful.Application.Extensions
{
    public static class ServiceColletionExtension
    {
        public static IServiceCollection AddDefaultServices(this IServiceCollection services)
        {
            services.AddLogging();
            services.AddOptions();
            services.AddHttpContextAccessor();
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            SeedAccountsData.Initialize(services.BuildServiceProvider().GetRequiredService<IServiceScopeFactory>().CreateScope().ServiceProvider).Wait();
            return services;
        }


        public static IServiceCollection AddGhadifulServices(this IServiceCollection services)
        {
            services.AddAutoMapper(option => option.AddProfile(typeof(Helper.AutoMapper)));
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IOrganizationService, OrganizationService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<INoticeBoardService, NoticeBoardService>();
            services.AddScoped<IReportService, ReportService>();
            services.AddScoped<IHolidayService, HolidayService>();
            services.AddScoped<IHolidayEventService, HolidayEventService>();
            services.AddScoped<IGroupService, GroupService>();
            services.AddScoped<IDesignationService, DesignationService>();
            services.AddScoped<IOvertimeLimitService, OvertimeLimitService>();
            services.AddScoped<ILeaveService, LeaveService>();
            services.AddScoped<IShiftService, ShiftService>();
            return services;
        }
    }
}
