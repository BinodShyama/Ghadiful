using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Ghadiful.ViewModel.NoticeBoard
{
    public class NoticeBoardViewModel
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Content { get; set; } = null!;

        public string Category { get; set; } = null!;

        public bool IsPublished { get; set; }

        public int? PublishDate { get; set; }

        public string TargetUserType { get; set; } = null!;

        public long? TargetGroupId { get; set; }

        public virtual Calendar? PublishDateNavigation { get; set; }

        public virtual Group? TargetGroup { get; set; }
    }
}
