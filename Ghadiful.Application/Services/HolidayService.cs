using AutoMapper;
using Ghadiful.Application.Abstractions;
using Ghadiful.DataAccess;
using Ghadiful.DataAccess.Entities;
using Ghadiful.ViewModel.Holiday;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Ghadiful.Application.Services
{
    public class HolidayService : IHolidayService
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;
        private readonly ILogger<HolidayService> _logger;

        public HolidayService(ApplicationDbContext db, IMapper mapper, ILogger<HolidayService> logger)
        {
            _db = db;
            _mapper = mapper;
            _logger = logger;

        }



        public async Task<List<HolidayViewModel>> GetAllHolidayAsync() => _mapper.Map<List<HolidayViewModel>>(await _db.Holidays.ToListAsync());


        public async Task<HolidayViewModel> GetHolidayAsync(int id)
        {
            try
            {
                return _mapper.Map<HolidayViewModel>(await _db.Holidays.FindAsync(id));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new HolidayViewModel();
            }

        }

        public async Task<int> SaveAsync(HolidayViewModel model)
        {
            var existingHoliday = await _db.Holidays.Where(c => c.Name == model.Name).FirstOrDefaultAsync();
            if(existingHoliday != null)
            {
                return existingHoliday.Id;
            }
            var holiday = _mapper.Map<Holiday>(model);
            await _db.Holidays.AddAsync(holiday);
            await _db.SaveChangesAsync();
            return holiday.Id;
        }
    }
}
