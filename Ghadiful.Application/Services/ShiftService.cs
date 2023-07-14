using AutoMapper;
using Ghadiful.Application.Abstractions;
using Ghadiful.DataAccess;
using Ghadiful.DataAccess.Entities;
using Ghadiful.ViewModel.Shifts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Ghadiful.Application.Services
{
    public class ShiftService : IShiftService
    {
        private readonly ILogger<ShiftService> _logger;
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public ShiftService(ApplicationDbContext db, ILogger<ShiftService> logger, IMapper mapper)
        {
            _db = db;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<ShiftActionViewModel> CreateAsync(ShiftViewModel model)
        {
            try
            {
                var shift = _mapper.Map<Shift>(model);
                await _db.Shifts.AddAsync(shift);
                return new ShiftActionViewModel { Message = "Successfully saved.", Status = true, Shift = _mapper.Map<ShiftViewModel>(shift) };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new ShiftActionViewModel { Message = ex.Message, Shift = model, Status = false };
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var shift = await _db.Shifts.FindAsync(id);
                if (shift != null)
                {
                    _db.Remove(shift);
                    await _db.SaveChangesAsync();
                    return true;
                }
                else
                {
                    return false;

                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return false;
            }
        }

        public async Task<List<ShiftViewModel>> GetAsync()
        {
            try
            {
                return _mapper.Map<List<ShiftViewModel>>(await _db.Shifts.ToListAsync());
            }catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new List<ShiftViewModel>();
            }
        }

        public async Task<ShiftActionViewModel> GetByIdAsync(int id)
        {
            try
            {
                var shift = await _db.Shifts.FindAsync(id);
                if (shift is null)
                {
                    return new ShiftActionViewModel { Message = "No shift found", Status = false, Shift = new ShiftViewModel() };
                }
                return new ShiftActionViewModel { Message = "", Status = true, Shift = _mapper.Map<ShiftViewModel>(shift) };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new ShiftActionViewModel { Shift = new ShiftViewModel(), Message = "No shift found.", Status = false };
            }
        }

        public async Task<ShiftActionViewModel> UpdateAsync(ShiftViewModel model)
        {
            try
            {
                var shift = _mapper.Map<Shift>(model);
                _db.Shifts.Update(shift);
                await _db.SaveChangesAsync();
                return new ShiftActionViewModel { Message = "Updated scussfully.", Shift = _mapper.Map<ShiftViewModel>(shift), Status = true };

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new ShiftActionViewModel { Message = ex.Message, Status = false, Shift = model };
            }
        }
    }
}

