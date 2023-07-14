using AutoMapper;
using Dapper;
using Ghadiful.Application.Abstractions;
using Ghadiful.DataAccess;
using Ghadiful.ViewModel.Holiday;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Ghadiful.Application.Services
{
    public class HolidayEventService : IHolidayEventService
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;
        private readonly ILogger<HolidayEventService> _logger;
        private readonly string _connectionString = "";
        private readonly string storeProdecureHolidayEvents = "spGetAllHolidayByGroup";
        private readonly IHolidayService _holidayService;
        public HolidayEventService(ApplicationDbContext db, IMapper mapper, ILogger<HolidayEventService> logger, IHolidayService holidayService)
        {
            _db = db;
            _mapper = mapper;
            _logger = logger;
            _connectionString = db.Database.GetConnectionString() ?? "";
            _holidayService = holidayService;
        }

        public async Task<bool> DeleteAsync(HolidayEventEditViewModel data)
        {
            try
            {
                _db.HolidayCalendars.RemoveRange(_db.HolidayCalendars.Where(c => c.HolidayGroupId == data.Id));
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return false;
            }
        }

        public async Task<List<HolidayEventViewModel>> GetAllEventAsync()
        {
            try
            {
                if (string.IsNullOrEmpty(_connectionString))
                {
                    _logger.LogError("Connection string not valid.");
                    return new List<HolidayEventViewModel>();
                }
                else
                {
                    using (SqlConnection connection = new SqlConnection(_connectionString))
                    {
                        var result = (await connection.QueryAsync<HolidayEventViewModel>(storeProdecureHolidayEvents, null, commandType: System.Data.CommandType.StoredProcedure)).Select(c => new HolidayEventViewModel
                        {
                            EndTime = c.EndTime,
                            StartTime = c.StartTime,
                            Subject = c.Subject,
                            IsAllDay = true,
                            Groups = c.Group.Split(",").Select(int.Parse).ToList(),
                            Group = c.Group,
                            Id = c.Id,
                            HolidayId = c.HolidayId
                        }).ToList();
                        return result;
                    }
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new List<HolidayEventViewModel>();
            }
        }



        public async Task<bool> SaveAsync(HolidayEventEditViewModel data)
        {
            try
            {
                if(data.RequestType== "eventRemoved")
                {
                    return await DeleteAsync(data);
                }
                var calendar = await _db.Calendars.Where(c => c.Addate <= data.EndTime && c.Addate >= data.StartTime).ToListAsync();
                var totalDaysOfHoliday = (data.EndTime - data.StartTime).Days + 1;
                var aa = _db.HolidayCalendars.Max(c => (long?)c.HolidayGroupId) ?? 0;
                var calendarGroupId = data.RequestType == "eventCreated" ? (_db.HolidayCalendars.Max(c => (long?)c.HolidayGroupId) ?? 0) + 1 : data.Id;

                if (data.RequestType == "eventChanged")
                {
                    _db.HolidayCalendars.RemoveRange(_db.HolidayCalendars.Where(c => c.HolidayGroupId == data.Id));
                }

                if (data.HolidayId == 0 || data.HolidayId == null)
                {
                    data.HolidayId = await _holidayService.SaveAsync(new HolidayViewModel { Name = data.Subject });
                }
                foreach (var grp in data.Groups)
                {
                    for (int i = 0; i < totalDaysOfHoliday; i++)
                    {
                        await _db.HolidayCalendars.AddAsync(new DataAccess.Entities.HolidayCalendar { GroupId = grp, CalendarId = calendar.Where(c => c.Addate.Date == (data.StartTime.Date).AddDays(i)).Select(c => c.Id).First(), HolidayId = data.HolidayId ?? 0, HolidayGroupId = calendarGroupId });

                    }

                }
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return false;
            }
        }
    }
}
