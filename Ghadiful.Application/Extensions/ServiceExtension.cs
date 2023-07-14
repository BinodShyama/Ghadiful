using Ghadiful.DataAccess;
using Ghadiful.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Ghadiful.Application.Extensions
{
    public static class ServiceExtension
    {
        public static Calendar ToCalendar(this DateTime value)
        {
            try
            {
                // Build configuration
                var configurationBuilder = new ConfigurationBuilder()
                    .AddJsonFile("appsettings.json").Build();


                // Get the connection string from appsettings.json
                string connectionString = configurationBuilder.GetConnectionString("GhadifulConnection");

                // Configure the database connection
                var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
                optionsBuilder.UseSqlServer(connectionString);

                // Create an instance of your DbContext using the configured options
                using var dbContext = new ApplicationDbContext(optionsBuilder.Options);
                return dbContext.Calendars.Where(c=>c.Addate== value).First();
            }
            catch (Exception ex)
            {
                return new Calendar();
            }
        }
    }
}
