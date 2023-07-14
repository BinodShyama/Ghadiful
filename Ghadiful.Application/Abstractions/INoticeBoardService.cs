using Ghadiful.ViewModel.NoticeBoard;
using Ghadiful.ViewModel.Organizations;

namespace Ghadiful.Application.Abstractions
{
    public interface INoticeBoardService
    {
        Task<List<NoticeBoardViewModel>> GetAsync();
    }
}
