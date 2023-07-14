using Ghadiful.DataAccess.Entities;
using Ghadiful.ViewModel.Leave;
using Ghadiful.ViewModel.Reports;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Ghadiful.DataAccess;

public partial class ApplicationDbContext : IdentityDbContext<User, Role, string>
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ApprovalHistory> ApprovalHistories { get; set; }

    public virtual DbSet<ApprovalStatus> ApprovalStatuses { get; set; }

    public virtual DbSet<Approver> Approvers { get; set; }

    public virtual DbSet<BiometricLog> BiometricLogs { get; set; }

    public virtual DbSet<BiometricTracker> BiometricTrackers { get; set; }

    public virtual DbSet<Break> Breaks { get; set; }

    public virtual DbSet<BreakLog> BreakLogs { get; set; }

    public virtual DbSet<Calendar> Calendars { get; set; }

    public virtual DbSet<CalendarMonth> CalendarMonths { get; set; }

    public virtual DbSet<CalendarYear> CalendarYears { get; set; }

    public virtual DbSet<CheckInOutLog> CheckInOutLogs { get; set; }

    public virtual DbSet<CheckInOutRangeOverride> CheckInOutRangeOverrides { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<EmployeeGroup> EmployeeGroups { get; set; }

    public virtual DbSet<EmployeePosition> EmployeePositions { get; set; }

    public virtual DbSet<EmployeeTag> EmployeeTags { get; set; }

    public virtual DbSet<EmployeeTransfer> EmployeeTransfers { get; set; }

    public virtual DbSet<GraceTimeOverride> GraceTimeOverrides { get; set; }

    public virtual DbSet<Group> Groups { get; set; }

    public virtual DbSet<Holiday> Holidays { get; set; }

    public virtual DbSet<HolidayCalendar> HolidayCalendars { get; set; }

    public virtual DbSet<Leave> Leaves { get; set; }

    public virtual DbSet<LeaveBalance> LeaveBalances { get; set; }

    public virtual DbSet<LeaveEarningPolicy> LeaveEarningPolicies { get; set; }

    public virtual DbSet<LeaveTaken> LeaveTakens { get; set; }

    public virtual DbSet<LeaveTakenPolicy> LeaveTakenPolicies { get; set; }

    public virtual DbSet<LeaveYearClosingPolicy> LeaveYearClosingPolicies { get; set; }

    public virtual DbSet<ManualLog> ManualLogs { get; set; }

    public virtual DbSet<MonthlyRoutine> MonthlyRoutines { get; set; }

    public virtual DbSet<Notice> Notices { get; set; }

    public virtual DbSet<Organization> Organizations { get; set; }

    public virtual DbSet<OrganizationGroup> OrganizationGroups { get; set; }

    public virtual DbSet<OrganizationTag> OrganizationTags { get; set; }

    public virtual DbSet<OvertimeLimit> OvertimeLimits { get; set; }

    public virtual DbSet<OvertimeLimitOverride> OvertimeLimitOverrides { get; set; }

    public virtual DbSet<OvertimeLog> OvertimeLogs { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }

    public virtual DbSet<PermissionGroup> PermissionGroups { get; set; }

    public virtual DbSet<Position> Positions { get; set; }

    public virtual DbSet<PositionTag> PositionTags { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<RolePermission> RolePermissions { get; set; }

    public virtual DbSet<Routine> Routines { get; set; }

    public virtual DbSet<Schedule> Schedules { get; set; }

    public virtual DbSet<ScheduleOverride> ScheduleOverrides { get; set; }

    public virtual DbSet<Setting> Settings { get; set; }

    public virtual DbSet<Shift> Shifts { get; set; }

    public virtual DbSet<ShiftBreak> ShiftBreaks { get; set; }

    public virtual DbSet<TmpEmployee> TmpEmployees { get; set; }

    public virtual DbSet<TmpOrganization> TmpOrganizations { get; set; }

    public virtual DbSet<TmpOrganizationholidaygroup> TmpOrganizationholidaygroups { get; set; }

    public virtual DbSet<TmpShift> TmpShifts { get; set; }

    public virtual DbSet<TrackerAssignment> TrackerAssignments { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserAccess> UserAccesses { get; set; }

    public virtual DbSet<UserClaim> UserClaims { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ApprovalHistory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Approval__3214EC07600BC0E5");

            entity.ToTable("ApprovalHistory");

            entity.Property(e => e.RecordTable)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Remarks).HasMaxLength(200);
            entity.Property(e => e.UserId).HasMaxLength(450);

            entity.HasOne(d => d.Calendar).WithMany(p => p.ApprovalHistories)
                .HasForeignKey(d => d.CalendarId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ApprovalH__Calen__59C55456");

            entity.HasOne(d => d.Status).WithMany(p => p.ApprovalHistories)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ApprovalH__Statu__5BAD9CC8");

            //entity.HasOne(d => d.User).WithMany(p => p.ApprovalHistories)
            //    .HasForeignKey(d => d.UserId)
            //    .OnDelete(DeleteBehavior.ClientSetNull)
            //    .HasConstraintName("FK__ApprovalH__UserI__59904A2C");
        });

        modelBuilder.Entity<ApprovalStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Approval__3214EC07FEAF04F1");

            entity.ToTable("ApprovalStatus");

            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Sentiment)
                .HasMaxLength(10)
                .IsUnicode(false);

            entity.HasOne(d => d.BackFlow).WithMany(p => p.InverseBackFlow)
                .HasForeignKey(d => d.BackFlowId)
                .HasConstraintName("FK__ApprovalS__BackF__4A8310C6");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("FK__ApprovalS__Paren__498EEC8D");
        });

        modelBuilder.Entity<Approver>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Approver__3214EC07506E0867");

            entity.ToTable("Approver");

            entity.HasOne(d => d.Group).WithMany(p => p.Approvers)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Approver__GroupI__56E8E7AB");

            entity.HasOne(d => d.Status).WithMany(p => p.Approvers)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Approver__Status__55F4C372");
        });

        modelBuilder.Entity<BiometricLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Biometri__3214EC0773941237");

            entity.ToTable("BiometricLog");

            entity.Property(e => e.InOutMode)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Timestamp).HasPrecision(0);
            entity.Property(e => e.VerifyMode)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.Calendar).WithMany(p => p.BiometricLogs)
                .HasForeignKey(d => d.CalendarId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Biometric__Calen__2DE6D218");

            entity.HasOne(d => d.Tracker).WithMany(p => p.BiometricLogs)
                .HasForeignKey(d => d.TrackerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Biometric__Track__2EDAF651");
        });

        modelBuilder.Entity<BiometricTracker>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Biometri__3214EC07E4D99768");

            entity.ToTable("BiometricTracker");

            entity.HasIndex(e => e.Ipaddress, "UQ__Biometri__F0C25BE0E65D955E").IsUnique();

            entity.Property(e => e.Brand)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Ipaddress)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("IPAddress");
            entity.Property(e => e.Model)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.SerialNumber)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.VerifyModes)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Break>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Break__3214EC07D9600071");

            entity.ToTable("Break");

            entity.HasIndex(e => e.Name, "UQ__Break__737584F6C47B0319").IsUnique();

            entity.HasIndex(e => e.Code, "UQ__Break__A25C5AA77518EFCE").IsUnique();

            entity.Property(e => e.Code)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<BreakLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__BreakLog__3214EC07161BF1A4");

            entity.ToTable("BreakLog");

            entity.Property(e => e.BreakIn).HasPrecision(0);
            entity.Property(e => e.BreakOut).HasPrecision(0);

            entity.HasOne(d => d.Calendar).WithMany(p => p.BreakLogs)
                .HasForeignKey(d => d.CalendarId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__BreakLog__Calend__32AB8735");

            entity.HasOne(d => d.Employee).WithMany(p => p.BreakLogs)
                .HasForeignKey(d => d.EmployeeId)
                .HasConstraintName("FK__BreakLog__Employ__339FAB6E");

            entity.HasOne(d => d.Shift).WithMany(p => p.BreakLogs)
                .HasForeignKey(d => d.ShiftId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__BreakLog__ShiftI__3493CFA7");
        });

        modelBuilder.Entity<Calendar>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Calendar__3214EC072873601B");

            entity.ToTable("Calendar");

            entity.Property(e => e.Addate)
                .HasColumnType("date")
                .HasColumnName("ADDate");
            entity.Property(e => e.Bsdate).HasColumnName("BSDate");

            entity.HasOne(d => d.Month).WithMany(p => p.Calendars)
                .HasForeignKey(d => d.MonthId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Calendar__MonthI__7E37BEF6");
        });

        modelBuilder.Entity<CalendarMonth>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Calendar__3214EC0722055D78");

            entity.ToTable("CalendarMonth");

            entity.HasOne(d => d.Year).WithMany(p => p.CalendarMonths)
                .HasForeignKey(d => d.YearId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CalendarM__YearI__7B5B524B");
        });

        modelBuilder.Entity<CalendarYear>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Calendar__3214EC07821757EA");

            entity.ToTable("CalendarYear");

            entity.Property(e => e.EndDate).HasColumnType("date");
            entity.Property(e => e.StartDate).HasColumnType("date");
        });

        modelBuilder.Entity<CheckInOutLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CheckInO__3214EC07BCCF8C30");

            entity.ToTable("CheckInOutLog");

            entity.Property(e => e.CheckIn).HasPrecision(0);
            entity.Property(e => e.CheckOut).HasPrecision(0);
            entity.Property(e => e.CinOrganizationId).HasColumnName("CInOrganizationId");
            entity.Property(e => e.CinSourceId).HasColumnName("CInSourceId");
            entity.Property(e => e.CinSourceType)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("CInSourceType");
            entity.Property(e => e.CoutOrganizationId).HasColumnName("COutOrganizationId");
            entity.Property(e => e.CoutSourceId).HasColumnName("COutSourceId");
            entity.Property(e => e.CoutSourceType)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("COutSourceType");

            entity.HasOne(d => d.Calendar).WithMany(p => p.CheckInOutLogs)
                .HasForeignKey(d => d.CalendarId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CheckInOu__Calen__40058253");

            entity.HasOne(d => d.CinOrganization).WithMany(p => p.CheckInOutLogCinOrganizations)
                .HasForeignKey(d => d.CinOrganizationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CheckInOu__CInOr__45BE5BA9");

            entity.HasOne(d => d.CoutOrganization).WithMany(p => p.CheckInOutLogCoutOrganizations)
                .HasForeignKey(d => d.CoutOrganizationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CheckInOu__COutO__46B27FE2");

            entity.HasOne(d => d.EmpOrganization).WithMany(p => p.CheckInOutLogEmpOrganizations)
                .HasForeignKey(d => d.EmpOrganizationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CheckInOu__EmpOr__44CA3770");

            entity.HasOne(d => d.Employee).WithMany(p => p.CheckInOutLogs)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CheckInOu__Emplo__40F9A68C");

            entity.HasOne(d => d.Shift).WithMany(p => p.CheckInOutLogs)
                .HasForeignKey(d => d.ShiftId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CheckInOu__Shift__41EDCAC5");
        });

        modelBuilder.Entity<CheckInOutRangeOverride>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CheckInO__3214EC075B5BB0D9");

            entity.ToTable("CheckInOutRangeOverride");

            entity.Property(e => e.CheckInStartMinute).HasDefaultValueSql("((60))");
            entity.Property(e => e.CheckOutEndMinute).HasDefaultValueSql("((60))");

            entity.HasOne(d => d.Calendar).WithMany(p => p.CheckInOutRangeOverrides)
                .HasForeignKey(d => d.CalendarId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CheckInOu__Calen__7C1A6C5A");

            entity.HasOne(d => d.Employee).WithMany(p => p.CheckInOutRangeOverrides)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CheckInOu__Emplo__7B264821");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Employee__3214EC078B1A3F83");

            entity.ToTable("Employee");

            entity.HasIndex(e => e.DeviceEnrollNumber, "UQ__Employee__5476532470683998").IsUnique();

            entity.HasIndex(e => e.PayrollNumber, "UQ__Employee__D1C5B2C1EE09B09E").IsUnique();

            entity.HasIndex(e => e.OfficialNumber, "UQ__Employee__DE1F8998D94D27E5").IsUnique();

            entity.Property(e => e.CheckInGraceMinute).HasDefaultValueSql("((15))");
            entity.Property(e => e.CheckInStartMinute).HasDefaultValueSql("((60))");
            entity.Property(e => e.CheckOutEndMinute).HasDefaultValueSql("((60))");
            entity.Property(e => e.CheckOutGraceMinute).HasDefaultValueSql("((5))");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.OfficialNumber).HasMaxLength(100);
            entity.Property(e => e.OverTimeLimit).HasDefaultValueSql("((1))");
            entity.Property(e => e.PayrollNumber).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.LastOrganization).WithMany(p => p.Employees)
                .HasForeignKey(d => d.LastOrganizationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Employee__LastOr__693CA210");

            entity.HasOne(d => d.LastPosition).WithMany(p => p.Employees)
                .HasForeignKey(d => d.LastPositionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Employee__LastPo__0B91BA14");

            entity.HasOne(d => d.LastPromotionOrJoinedDateNavigation).WithMany(p => p.EmployeeLastPromotionOrJoinedDateNavigations)
                .HasForeignKey(d => d.LastPromotionOrJoinedDate)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Employee__LastPr__3EDC53F0");

            entity.HasOne(d => d.LastTransferOrJoinedDateNavigation).WithMany(p => p.EmployeeLastTransferOrJoinedDateNavigations)
                .HasForeignKey(d => d.LastTransferOrJoinedDate)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Employee__LastTr__3FD07829");

            entity.HasOne(d => d.OverTimeLimitNavigation).WithMany(p => p.Employees)
                .HasForeignKey(d => d.OverTimeLimit)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Employee__OverTi__7849DB76");
        });

        modelBuilder.Entity<EmployeeGroup>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Employee__3214EC07BA11D670");

            entity.ToTable("EmployeeGroup");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeGroups)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__EmployeeG__Emplo__6383C8BA");

            entity.HasOne(d => d.Group).WithMany(p => p.EmployeeGroups)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__EmployeeG__Group__628FA481");
        });

        modelBuilder.Entity<EmployeePosition>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Employee__3214EC07EBB6F454");

            entity.ToTable("EmployeePosition");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeePositions)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__EmployeeP__Emplo__07C12930");

            entity.HasOne(d => d.EndDateNavigation).WithMany(p => p.EmployeePositionEndDateNavigations)
                .HasForeignKey(d => d.EndDate)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__EmployeeP__EndDa__0A9D95DB");

            entity.HasOne(d => d.Position).WithMany(p => p.EmployeePositions)
                .HasForeignKey(d => d.PositionId)
                .HasConstraintName("FK__EmployeeP__Posit__08B54D69");

            entity.HasOne(d => d.StartDateNavigation).WithMany(p => p.EmployeePositionStartDateNavigations)
                .HasForeignKey(d => d.StartDate)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__EmployeeP__Start__09A971A2");
        });

        modelBuilder.Entity<EmployeeTag>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Employee__3214EC07819ADAAC");

            entity.ToTable("EmployeeTag");

            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Value).HasMaxLength(100);

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeTags)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__EmployeeT__Emplo__52593CB8");
        });

        modelBuilder.Entity<EmployeeTransfer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Employee__3214EC078CD49BF3");

            entity.ToTable("EmployeeTransfer");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeTransfers)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__EmployeeT__Emplo__01142BA1");

            entity.HasOne(d => d.EndDateNavigation).WithMany(p => p.EmployeeTransferEndDateNavigations)
                .HasForeignKey(d => d.EndDate)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__EmployeeT__EndDa__03F0984C");

            entity.HasOne(d => d.Organization).WithMany(p => p.EmployeeTransfers)
                .HasForeignKey(d => d.OrganizationId)
                .HasConstraintName("FK__EmployeeT__Organ__02084FDA");

            entity.HasOne(d => d.StartDateNavigation).WithMany(p => p.EmployeeTransferStartDateNavigations)
                .HasForeignKey(d => d.StartDate)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__EmployeeT__Start__02FC7413");
        });

        modelBuilder.Entity<GraceTimeOverride>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__GraceTim__3214EC07BD092C1C");

            entity.ToTable("GraceTimeOverride");

            entity.Property(e => e.CheckInGraceMinute).HasDefaultValueSql("((15))");
            entity.Property(e => e.CheckOutGraceMinute).HasDefaultValueSql("((5))");

            entity.HasOne(d => d.Calendar).WithMany(p => p.GraceTimeOverrides)
                .HasForeignKey(d => d.CalendarId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__GraceTime__Calen__01D345B0");

            entity.HasOne(d => d.Employee).WithMany(p => p.GraceTimeOverrides)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__GraceTime__Emplo__00DF2177");
        });

        modelBuilder.Entity<Group>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Group__3214EC079BEB4C21");

            entity.ToTable("Group");

            entity.HasIndex(e => e.Name, "UQ__Group__737584F63806ADF6").IsUnique();

            entity.Property(e => e.Name)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.Tags)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.Type)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Holiday>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Holiday__3214EC0739AF4890");

            entity.ToTable("Holiday");

            entity.HasIndex(e => e.Name, "UQ__Holiday__737584F6E2D0736D").IsUnique();

            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<HolidayCalendar>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__HolidayC__3214EC074E09343E");

            entity.ToTable("HolidayCalendar");

            entity.HasOne(d => d.Calendar).WithMany(p => p.HolidayCalendars)
                .HasForeignKey(d => d.CalendarId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__HolidayCa__Calen__2FCF1A8A");

            entity.HasOne(d => d.Group).WithMany(p => p.HolidayCalendars)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__HolidayCa__Group__151B244E");

            entity.HasOne(d => d.Holiday).WithMany(p => p.HolidayCalendars)
                .HasForeignKey(d => d.HolidayId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__HolidayCa__Holid__14270015");
        });

        modelBuilder.Entity<Leave>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Leave__3214EC079C67A88B");

            entity.ToTable("Leave");

            entity.Property(e => e.Category)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Code)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.MaintainMaxBalance).HasColumnType("decimal(6, 2)");
            entity.Property(e => e.MaintainMinBalance).HasColumnType("decimal(6, 2)");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Paid)
                .IsRequired()
                .HasDefaultValueSql("((1))");
            entity.Property(e => e.PayrollCode)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Unit)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<LeaveBalance>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LeaveBal__3214EC0738EC6A9A");

            entity.ToTable("LeaveBalance");

            entity.Property(e => e.Duration).HasColumnType("decimal(6, 2)");
            entity.Property(e => e.Remarks).HasMaxLength(200);
            entity.Property(e => e.Source)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.EffectiveDateNavigation).WithMany(p => p.LeaveBalanceEffectiveDateNavigations)
                .HasForeignKey(d => d.EffectiveDate)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LeaveBala__Effec__0F2D40CE");

            entity.HasOne(d => d.Employee).WithMany(p => p.LeaveBalances)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LeaveBala__Emplo__0D44F85C");

            entity.HasOne(d => d.ExpiryDateNavigation).WithMany(p => p.LeaveBalanceExpiryDateNavigations)
                .HasForeignKey(d => d.ExpiryDate)
                .HasConstraintName("FK__LeaveBala__Expir__10216507");

            entity.HasOne(d => d.Leave).WithMany(p => p.LeaveBalances)
                .HasForeignKey(d => d.LeaveId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LeaveBala__Leave__0E391C95");
        });

        modelBuilder.Entity<LeaveEarningPolicy>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LeaveEar__3214EC0794E43A6A");

            entity.ToTable("LeaveEarningPolicy");

            entity.Property(e => e.DurationOrEarningRatio).HasColumnType("decimal(6, 2)");
            entity.Property(e => e.Expiry)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Frequency)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MaxDurationPerEarning).HasColumnType("decimal(6, 2)");
            entity.Property(e => e.VaryBy)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.EligibleGroup).WithMany(p => p.LeaveEarningPolicies)
                .HasForeignKey(d => d.EligibleGroupId)
                .HasConstraintName("FK__LeaveEarn__Eligi__13F1F5EB");

            entity.HasOne(d => d.Leave).WithMany(p => p.LeaveEarningPolicies)
                .HasForeignKey(d => d.LeaveId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LeaveEarn__Leave__12FDD1B2");
        });

        modelBuilder.Entity<LeaveTaken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LeaveTak__3214EC074BE0C088");

            entity.ToTable("LeaveTaken");

            entity.Property(e => e.DurationEachDay).HasColumnType("decimal(6, 2)");
            entity.Property(e => e.GrossDuration).HasColumnType("decimal(6, 2)");
            entity.Property(e => e.NetDuration).HasColumnType("decimal(6, 2)");
            entity.Property(e => e.Remarks).HasMaxLength(200);

            entity.HasOne(d => d.ApprovalGroup).WithMany(p => p.LeaveTakens)
                .HasForeignKey(d => d.ApprovalGroupId)
                .HasConstraintName("FK__LeaveTake__Appro__2610A626");

            entity.HasOne(d => d.ApprovalStatus).WithMany(p => p.LeaveTakens)
                .HasForeignKey(d => d.ApprovalStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LeaveTake__Appro__251C81ED");

            entity.HasOne(d => d.Employee).WithMany(p => p.LeaveTakens)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LeaveTake__Emplo__22401542");

            entity.HasOne(d => d.EndDateNavigation).WithMany(p => p.LeaveTakenEndDateNavigations)
                .HasForeignKey(d => d.EndDate)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LeaveTake__EndDa__24285DB4");

            entity.HasOne(d => d.Leave).WithMany(p => p.LeaveTakens)
                .HasForeignKey(d => d.LeaveId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LeaveTake__Leave__214BF109");

            entity.HasOne(d => d.StartDateNavigation).WithMany(p => p.LeaveTakenStartDateNavigations)
                .HasForeignKey(d => d.StartDate)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LeaveTake__Start__2334397B");
        });

        modelBuilder.Entity<LeaveTakenPolicy>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LeaveTak__3214EC07DB4AF527");

            entity.ToTable("LeaveTakenPolicy");

            entity.Property(e => e.MaxDuration).HasColumnType("decimal(6, 2)");
            entity.Property(e => e.MinDuration).HasColumnType("decimal(6, 2)");

            entity.HasOne(d => d.EligibleGroup).WithMany(p => p.LeaveTakenPolicies)
                .HasForeignKey(d => d.EligibleGroupId)
                .HasConstraintName("FK__LeaveTake__Eligi__1C873BEC");

            entity.HasOne(d => d.Leave).WithMany(p => p.LeaveTakenPolicies)
                .HasForeignKey(d => d.LeaveId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LeaveTake__Leave__1B9317B3");
        });

        modelBuilder.Entity<LeaveYearClosingPolicy>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LeaveYea__3214EC07586221EB");

            entity.ToTable("LeaveYearClosingPolicy");

            entity.Property(e => e.MaxCarryForwardable).HasColumnType("decimal(6, 2)");
            entity.Property(e => e.MaxEncashable).HasColumnType("decimal(6, 2)");

            entity.HasOne(d => d.EligibleGroup).WithMany(p => p.LeaveYearClosingPolicies)
                .HasForeignKey(d => d.EligibleGroupId)
                .HasConstraintName("FK__LeaveYear__Eligi__18B6AB08");

            entity.HasOne(d => d.Leave).WithMany(p => p.LeaveYearClosingPolicies)
                .HasForeignKey(d => d.LeaveId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LeaveYear__Leave__17C286CF");
        });

        modelBuilder.Entity<ManualLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ManualLo__3214EC07877A7CA8");

            entity.ToTable("ManualLog");

            entity.Property(e => e.InOutMode)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Remarks).HasMaxLength(200);
            entity.Property(e => e.Timestamp).HasPrecision(0);

            entity.HasOne(d => d.ApprovalStatus).WithMany(p => p.ManualLogs)
                .HasForeignKey(d => d.ApprovalStatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ManualLog__Appro__5224328E");

            entity.HasOne(d => d.ApproverGroup).WithMany(p => p.ManualLogs)
                .HasForeignKey(d => d.ApproverGroupId)
                .HasConstraintName("FK__ManualLog__Appro__531856C7");

            entity.HasOne(d => d.Calendar).WithMany(p => p.ManualLogs)
                .HasForeignKey(d => d.CalendarId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ManualLog__Calen__4F47C5E3");

            entity.HasOne(d => d.Employee).WithMany(p => p.ManualLogs)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ManualLog__Emplo__503BEA1C");

            entity.HasOne(d => d.InOutOrganization).WithMany(p => p.ManualLogs)
                .HasForeignKey(d => d.InOutOrganizationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ManualLog__InOut__51300E55");
        });

        modelBuilder.Entity<MonthlyRoutine>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MonthlyR__3214EC0791D36AF3");

            entity.ToTable("MonthlyRoutine");

            entity.Property(e => e.Type)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.Routine).WithMany(p => p.MonthlyRoutines)
                .HasForeignKey(d => d.RoutineId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MonthlyRo__Routi__6166761E");

            entity.HasOne(d => d.Shift).WithMany(p => p.MonthlyRoutines)
                .HasForeignKey(d => d.ShiftId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MonthlyRo__Shift__625A9A57");
        });

        modelBuilder.Entity<Notice>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Notice__3214EC07378CD1A8");

            entity.ToTable("Notice");

            entity.Property(e => e.Category)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Content).HasMaxLength(2000);
            entity.Property(e => e.TargetUserType)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Title).HasMaxLength(200);

            entity.HasOne(d => d.PublishDateNavigation).WithMany(p => p.Notices)
                .HasForeignKey(d => d.PublishDate)
                .HasConstraintName("FK__Notice__PublishD__4C364F0E");

            entity.HasOne(d => d.TargetGroup).WithMany(p => p.Notices)
                .HasForeignKey(d => d.TargetGroupId)
                .HasConstraintName("FK__Notice__TargetGr__4D2A7347");
        });

        modelBuilder.Entity<Organization>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Organiza__3214EC0751A9A49F");

            entity.ToTable("Organization");

            entity.HasIndex(e => e.Name, "UQ__Organiza__737584F6AD8CE9DA").IsUnique();

            entity.Property(e => e.Address)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Ip4address)
                .HasMaxLength(4)
                .IsFixedLength()
                .HasColumnName("IP4Address");
            entity.Property(e => e.Ip6address)
                .HasMaxLength(16)
                .IsFixedLength()
                .HasColumnName("IP6Address");
            entity.Property(e => e.IsActive).HasDefaultValueSql("((1))");
            entity.Property(e => e.Name)
                .HasMaxLength(200)
                .IsUnicode(false);

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("FK__Organizat__Paren__38996AB5");
        });

        modelBuilder.Entity<OrganizationGroup>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Organiza__3214EC07883C9934");

            entity.ToTable("OrganizationGroup");

            entity.HasOne(d => d.Group).WithMany(p => p.OrganizationGroups)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Organizat__Group__5EBF139D");

            entity.HasOne(d => d.Organization).WithMany(p => p.OrganizationGroups)
                .HasForeignKey(d => d.OrganizationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Organizat__Organ__5FB337D6");
        });

        modelBuilder.Entity<OrganizationTag>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Organiza__3214EC07520C0EB1");

            entity.ToTable("OrganizationTag");

            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Value).HasMaxLength(200);

            entity.HasOne(d => d.Organization).WithMany(p => p.OrganizationTags)
                .HasForeignKey(d => d.OrganizationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Organizat__Organ__3C69FB99");
        });

        modelBuilder.Entity<OvertimeLimit>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Overtime__3214EC07780BB14D");

            entity.ToTable("OvertimeLimit");

            entity.HasIndex(e => e.Name, "UQ__Overtime__737584F64B938B65").IsUnique();

            entity.HasIndex(e => e.Code, "UQ__Overtime__A25C5AA750B8B482").IsUnique();

            entity.Property(e => e.AfterShift).HasColumnType("decimal(4, 2)");
            entity.Property(e => e.BeforeShift).HasColumnType("decimal(4, 2)");
            entity.Property(e => e.Code)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.MaxHour).HasColumnType("decimal(4, 2)");
            entity.Property(e => e.MaxHourPerDay).HasColumnType("decimal(4, 2)");
            entity.Property(e => e.MaxHourPerMonth).HasColumnType("decimal(4, 2)");
            entity.Property(e => e.MaxHourPerWeek).HasColumnType("decimal(4, 2)");
            entity.Property(e => e.MinHour).HasColumnType("decimal(4, 2)");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<OvertimeLimitOverride>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Overtime__3214EC07F0711EB2");

            entity.ToTable("OvertimeLimitOverride");

            entity.HasOne(d => d.Calendar).WithMany(p => p.OvertimeLimitOverrides)
                .HasForeignKey(d => d.CalendarId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__OvertimeL__Calen__078C1F06");

            entity.HasOne(d => d.Employee).WithMany(p => p.OvertimeLimitOverrides)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__OvertimeL__Emplo__0697FACD");

            entity.HasOne(d => d.OverTimeLimit).WithMany(p => p.OvertimeLimitOverrides)
                .HasForeignKey(d => d.OverTimeLimitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__OvertimeL__OverT__0880433F");
        });

        modelBuilder.Entity<OvertimeLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Overtime__3214EC07A6EAAF0E");

            entity.ToTable("OvertimeLog");

            entity.Property(e => e.OvertimeIn).HasPrecision(0);
            entity.Property(e => e.OvertimeOut).HasPrecision(0);

            entity.HasOne(d => d.Calendar).WithMany(p => p.OvertimeLogs)
                .HasForeignKey(d => d.CalendarId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__OvertimeL__Calen__395884C4");

            entity.HasOne(d => d.Employee).WithMany(p => p.OvertimeLogs)
                .HasForeignKey(d => d.EmployeeId)
                .HasConstraintName("FK__OvertimeL__Emplo__3A4CA8FD");

            entity.HasOne(d => d.Shift).WithMany(p => p.OvertimeLogs)
                .HasForeignKey(d => d.ShiftId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__OvertimeL__Shift__3B40CD36");
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Permissi__3214EC0745A15E19");

            entity.ToTable("Permission");

            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.PermissionGroup).WithMany(p => p.Permissions)
                .HasForeignKey(d => d.PermissionGroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Permissio__Permi__44FF419A");
        });

        modelBuilder.Entity<PermissionGroup>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Permissi__3214EC07E3AFE50B");

            entity.ToTable("PermissionGroup");

            entity.HasIndex(e => e.Name, "UQ__Permissi__737584F6E025E63A").IsUnique();

            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Position>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Position__3214EC07DD3228A9");

            entity.ToTable("Position");

            entity.HasIndex(e => e.Name, "UQ__Position__737584F682F23228").IsUnique();

            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PositionTag>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Position__3214EC0767BDC925");

            entity.ToTable("PositionTag");

            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Value).HasMaxLength(100);

            entity.HasOne(d => d.Position).WithMany(p => p.PositionTags)
                .HasForeignKey(d => d.PositionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PositionT__Posit__73BA3083");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_IdentityRole");

            entity.ToTable("Role");

            entity.Property(e => e.Name).HasMaxLength(256);
            entity.Property(e => e.NormalizedName).HasMaxLength(256);
        });

        modelBuilder.Entity<RolePermission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RolePerm__3214EC07028F3CE4");

            entity.ToTable("RolePermission");

            entity.Property(e => e.RoleId).HasMaxLength(450);

            entity.HasOne(d => d.Permission).WithMany(p => p.RolePermissions)
                .HasForeignKey(d => d.PermissionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__RolePermi__Permi__48CFD27E");

            entity.HasOne(d => d.Role).WithMany(p => p.RolePermissions)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__RolePermi__RoleI__5C6CB6D7");
        });

        modelBuilder.Entity<Routine>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Routine__3214EC07DD97A61E");

            entity.ToTable("Routine");

            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Schedule>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Schedule__3214EC07507EC52B");

            entity.ToTable("Schedule");

            entity.HasOne(d => d.EndDateNavigation).WithMany(p => p.ScheduleEndDateNavigations)
                .HasForeignKey(d => d.EndDate)
                .HasConstraintName("FK__Schedule__EndDat__690797E6");

            entity.HasOne(d => d.Group).WithMany(p => p.Schedules)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Schedule__GroupI__671F4F74");

            entity.HasOne(d => d.Routine).WithMany(p => p.Schedules)
                .HasForeignKey(d => d.RoutineId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Schedule__Routin__662B2B3B");

            entity.HasOne(d => d.StartDateNavigation).WithMany(p => p.ScheduleStartDateNavigations)
                .HasForeignKey(d => d.StartDate)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Schedule__StartD__681373AD");
        });

        modelBuilder.Entity<ScheduleOverride>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Schedule__3214EC07D7B0EC95");

            entity.ToTable("ScheduleOverride");

            entity.HasOne(d => d.Calendar).WithMany(p => p.ScheduleOverrides)
                .HasForeignKey(d => d.CalendarId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ScheduleO__Calen__6DCC4D03");

            entity.HasOne(d => d.Group).WithMany(p => p.ScheduleOverrides)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ScheduleO__Group__6CD828CA");

            entity.HasOne(d => d.Shift).WithMany(p => p.ScheduleOverrides)
                .HasForeignKey(d => d.ShiftId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ScheduleO__Shift__6EC0713C");
        });

        modelBuilder.Entity<Setting>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Setting__3214EC078C789570");

            entity.ToTable("Setting");

            entity.HasIndex(e => e.Name, "UQ__Setting__737584F6FE24F10B").IsUnique();

            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Value).HasMaxLength(200);
        });

        modelBuilder.Entity<Shift>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Shift__3214EC07439E535F");

            entity.ToTable("Shift");

            entity.HasIndex(e => e.Name, "UQ__Shift__737584F63925BC33").IsUnique();

            entity.HasIndex(e => e.Code, "UQ__Shift__A25C5AA78A045077").IsUnique();

            entity.Property(e => e.Code)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Duration).HasPrecision(0);
            entity.Property(e => e.EndTime).HasPrecision(0);
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.StartTime).HasPrecision(0);
            entity.Property(e => e.Type)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasDefaultValueSql("('fixed')");
        });

        modelBuilder.Entity<ShiftBreak>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ShiftBre__3214EC0773957A38");

            entity.ToTable("ShiftBreak");

            entity.Property(e => e.EndTime).HasPrecision(0);
            entity.Property(e => e.StartTime).HasPrecision(0);

            entity.HasOne(d => d.Break).WithMany(p => p.ShiftBreaks)
                .HasForeignKey(d => d.BreakId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ShiftBrea__Break__2180FB33");

            entity.HasOne(d => d.Shift).WithMany(p => p.ShiftBreaks)
                .HasForeignKey(d => d.ShiftId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ShiftBrea__Shift__208CD6FA");
        });

        modelBuilder.Entity<TmpEmployee>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("tmp_employee");

            entity.Property(e => e.CheckInGraceMinute).HasColumnType("decimal(38, 0)");
            entity.Property(e => e.CheckInStartMinute).HasColumnType("decimal(38, 0)");
            entity.Property(e => e.CheckOutEndMinute).HasColumnType("decimal(38, 0)");
            entity.Property(e => e.CheckOutGraceMinute).HasColumnType("decimal(38, 0)");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.OfficialNumber).HasMaxLength(255);
            entity.Property(e => e.PayrollNumber).HasMaxLength(255);
            entity.Property(e => e.PhoneNumber).HasMaxLength(255);
            entity.Property(e => e.Status).HasMaxLength(255);
        });

        modelBuilder.Entity<TmpOrganization>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("tmp_Organization");

            entity.Property(e => e.BranchName)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TmpOrganizationholidaygroup>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("tmp_organizationholidaygroup");

            entity.Property(e => e.BranchId).HasColumnName("BranchID");
            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<TmpShift>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("tmp_shift");

            entity.Property(e => e.BeginTime).HasPrecision(0);
            entity.Property(e => e.EndTime).HasPrecision(0);
            entity.Property(e => e.ShiftCode).HasMaxLength(255);
            entity.Property(e => e.ShiftDuration).HasPrecision(0);
            entity.Property(e => e.Shiftname)
                .HasMaxLength(255)
                .HasColumnName("shiftname");
            entity.Property(e => e.Type).HasMaxLength(255);
        });

        modelBuilder.Entity<TrackerAssignment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TrackerA__3214EC0795391A4C");

            entity.ToTable("TrackerAssignment");

            entity.HasOne(d => d.Organization).WithMany(p => p.TrackerAssignments)
                .HasForeignKey(d => d.OrganizationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TrackerAs__Organ__2645B050");

            entity.HasOne(d => d.Tracker).WithMany(p => p.TrackerAssignments)
                .HasForeignKey(d => d.TrackerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TrackerAs__Track__25518C17");

            entity.HasOne(d => d.TrackingEndDateNavigation).WithMany(p => p.TrackerAssignmentTrackingEndDateNavigations)
                .HasForeignKey(d => d.TrackingEndDate)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TrackerAs__Track__282DF8C2");

            entity.HasOne(d => d.TrackingStartDateNavigation).WithMany(p => p.TrackerAssignmentTrackingStartDateNavigations)
                .HasForeignKey(d => d.TrackingStartDate)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TrackerAs__Track__2739D489");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_IdentityUser");

            entity.ToTable("User");

            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.NormalizedEmail).HasMaxLength(256);
            entity.Property(e => e.NormalizedUserName).HasMaxLength(256);
            entity.Property(e => e.UserName).HasMaxLength(256);

            //entity.HasOne(d => d.Employee).WithMany(p => p.Users)
            //    .HasForeignKey(d => d.EmployeeId)
            //    .HasConstraintName("FK__IdentityU__Emplo__56B3DD81");

            entity.HasOne(d => d.LastReadNoticeDateNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.LastReadNoticeDate)
                .HasConstraintName("FK__IdentityU__LastR__55BFB948");

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserRole",
                    r => r.HasOne<Role>().WithMany()
                        .HasForeignKey("RoleId")
                        .HasConstraintName("FK_UserRole_IdentityRole_RoleId"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_UserRole_IdentityUser_UserId"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId");
                        j.ToTable("UserRole");
                    });
        });

        modelBuilder.Entity<UserAccess>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__UserAcce__3214EC07198EF50F");

            entity.ToTable("UserAccess");

            entity.Property(e => e.RoleId).HasMaxLength(450);
            entity.Property(e => e.UserId).HasMaxLength(450);

            entity.HasOne(d => d.Group).WithMany(p => p.UserAccesses)
                .HasForeignKey(d => d.GroupId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserAcces__Group__6754599E");

            entity.HasOne(d => d.Role).WithMany(p => p.UserAccesses)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserAcces__RoleI__5B78929E");

            entity.HasOne(d => d.User).WithMany(p => p.UserAccesses)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserAcces__UserI__589C25F3");
        });

        modelBuilder.Entity<UserClaim>(entity =>
        {
            entity.ToTable("UserClaim");

            entity.Property(e => e.UserId).HasMaxLength(450);

            entity.HasOne(d => d.User).WithMany(p => p.UserClaims)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_UserClaim_IdentityUser_UserId");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CheckInViewModel>(entity => entity.HasNoKey());  
        modelBuilder.Entity<OvertimeViewModel>(entity => entity.HasNoKey());
        modelBuilder.Entity<LeaveBalanceViewModel>(entity => entity.HasNoKey());
        modelBuilder.Entity<PayrollSummaryViewModel>(entity => entity.HasNoKey());
    }    
}
