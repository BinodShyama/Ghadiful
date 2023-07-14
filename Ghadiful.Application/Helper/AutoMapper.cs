using AutoMapper;
using Ghadiful.DataAccess.Entities;
using Ghadiful.ViewModel.Designation;
using Ghadiful.ViewModel.Employees;
using Ghadiful.ViewModel.Groups;
using Ghadiful.ViewModel.Holiday;
using Ghadiful.ViewModel.Leave;
using Ghadiful.ViewModel.NoticeBoard;
using Ghadiful.ViewModel.Organizations;
using Ghadiful.ViewModel.OvertimeLimit;
using Ghadiful.ViewModel.Shifts;
using Ghadiful.ViewModel.Users;
using System.Drawing;

namespace Ghadiful.Application.Helper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<Employee, EmployeeViewModel>()
                .ForMember(c => c.Organization, opt => opt.MapFrom(c => c.LastOrganization.Name))
                .ForMember(c=> c.Position, opt=> opt.MapFrom(c=>c.LastPosition.Name))
                .ForMember(c=> c.Level, opt=> opt.MapFrom(c=>c.LastPosition.Level))
                .ForMember(c=> c.OvertimeLimit, opt=> opt.MapFrom(c=>c.OverTimeLimitNavigation.Name))
                .ReverseMap();

            CreateMap<Organization, OrganizationViewModel>()
                .ForMember(c => c.Parent, opt => opt.MapFrom(c => c.Parent == null ? "" : c.Parent.Name))
                .ReverseMap();

            CreateMap<User, UserViewModel>().ReverseMap();

            CreateMap<Notice, NoticeBoardViewModel>()
              .ReverseMap();

            CreateMap<Employee, EmployeeSearchViewModel>()
                .ReverseMap();

            CreateMap<Holiday, HolidayViewModel>().ReverseMap();
            CreateMap<Group, GroupViewModel>().ReverseMap();    
            CreateMap<EmployeeTag, EmployeeTagViewModel>()
                .ReverseMap();
            CreateMap<OrganizationTag, OrganizationTagViewModel>()
                .ReverseMap();

              CreateMap<Position, DesignationViewModel>()
                .ReverseMap();

              CreateMap<PositionTag, DesignationTagViewModel>()
                .ReverseMap();
            CreateMap<OvertimeLimit, OvertimeLimitViewModel>()
                .ReverseMap();
            CreateMap<ShiftViewModel, Shift>().ReverseMap();
        }
    }
}
