using Ghadiful.Application.Extensions;
using Ghadiful.DataAccess;
using Ghadiful.DataAccess.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("GhadifulConnection")), ServiceLifetime.Transient);
builder.Services.AddDbContext<ReportDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("GhadifulConnection")), ServiceLifetime.Transient);

builder.Services.AddIdentity<Ghadiful.DataAccess.Entities.User, Ghadiful.DataAccess.Entities.Role>(options => options.SignIn.RequireConfirmedAccount = true)
   .AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense(builder.Configuration.GetSection("syncfusion.LicenseKey").ToString());

builder.Services.AddDefaultServices();
builder.Services.AddGhadifulServices();
builder.Services.AddMemoryCache();

var allowaAyncfusionOrigins = "syncfusionOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowaAyncfusionOrigins,
                      policy =>
                      {
                          policy.WithOrigins("https://cdn.syncfusion.com/ej2/21.2.3/dist/ej2.min.js").
                          AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowAnyOrigin();
                      });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseCors(allowaAyncfusionOrigins);
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Dashboard}/{action=Index}/{id?}");

app.Run();
