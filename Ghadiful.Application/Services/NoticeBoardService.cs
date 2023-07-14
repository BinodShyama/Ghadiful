using AutoMapper;
using Ghadiful.Application.Abstractions;
using Ghadiful.DataAccess;
using Ghadiful.ViewModel.NoticeBoard;
using Ghadiful.ViewModel.Organizations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Ghadiful.Application.Services
{
    public class NoticeBoardService : INoticeBoardService
    {
        public readonly IMapper _mapper;
        public readonly ApplicationDbContext _db;
        public readonly ILogger _logger;

        public NoticeBoardService(IMapper mapper, ApplicationDbContext db, ILogger<OrganizationService> logger)
        {
            _mapper = mapper;
            _db = db;
            _logger = logger;
        }

        public async Task<List<NoticeBoardViewModel>> GetAsync()
        {
            try
            {
                return _mapper.Map<List<NoticeBoardViewModel>>(await _db.Notices.ToListAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                throw new InvalidDataException("Could not fetch data");
            }

        }
    }
}
