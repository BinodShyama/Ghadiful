using AutoMapper;
using Ghadiful.Application.Abstractions;
using Ghadiful.DataAccess;
using Ghadiful.ViewModel.Groups;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Ghadiful.Application.Services
{
    public class GroupService : IGroupService
    {
        private readonly IMapper _mapper;
        private readonly ILogger<GroupService> _logger;
        private readonly ApplicationDbContext _db;

        public GroupService(ApplicationDbContext db, ILogger<GroupService> logger, IMapper mapper)
        {
            _db = db;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<List<GroupViewModel>> GetAllGroupAsync() =>
            _mapper.Map<List<GroupViewModel>>(await _db.Groups.ToListAsync());


        public async Task<GroupViewModel> GetGroupAsync(int id)
        {
            try
            {
                return _mapper.Map<GroupViewModel>(await _db.Groups.FindAsync(id));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new GroupViewModel();
            }
        }
    }
}
