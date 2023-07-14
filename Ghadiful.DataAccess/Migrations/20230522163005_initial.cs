using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ghadiful.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "ApprovalStatus",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    BackFlowId = table.Column<int>(type: "int", nullable: true),
                    ProgressPercent = table.Column<int>(type: "int", nullable: false),
                    Sentiment = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Approval__3214EC07605B2872", x => x.Id);
                    table.ForeignKey(
                        name: "FK__ApprovalS__BackF__4C6B5938",
                        column: x => x.BackFlowId,
                        principalSchema: "dbo",
                        principalTable: "ApprovalStatus",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__ApprovalS__Paren__4B7734FF",
                        column: x => x.ParentId,
                        principalSchema: "dbo",
                        principalTable: "ApprovalStatus",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BiometricTracker",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IPAddress = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    PortNumber = table.Column<int>(type: "int", nullable: false),
                    CommPassword = table.Column<int>(type: "int", nullable: true),
                    Brand = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Model = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    VerifyModes = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    TemplateVersion = table.Column<int>(type: "int", nullable: true),
                    SerialNumber = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Biometri__3214EC073199CA9E", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Break",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Code = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Break__3214EC077AADEBD0", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CalendarYear",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Year = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "date", nullable: false),
                    EndDate = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Calendar__3214EC07C57D492E", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Group",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(1000)", unicode: false, maxLength: 1000, nullable: false),
                    Type = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Hierarchy = table.Column<long>(type: "bigint", nullable: true),
                    Tags = table.Column<string>(type: "varchar(1000)", unicode: false, maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Group__3214EC0730CB5D2B", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Holiday",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Holiday__3214EC072ABC982A", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "IdentityRole",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IdentityRole", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "IdentityUser",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IdentityUser", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Leave",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Code = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    PayrollCode = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    Unit = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    Category = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    MaintainMinBalance = table.Column<decimal>(type: "decimal(6,2)", nullable: false),
                    MaintainMaxBalance = table.Column<decimal>(type: "decimal(6,2)", nullable: false),
                    Paid = table.Column<bool>(type: "bit", nullable: false, defaultValueSql: "((1))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Leave__3214EC074A16200D", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Organization",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(200)", unicode: false, maxLength: 200, nullable: false),
                    ParentId = table.Column<int>(type: "int", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true, defaultValueSql: "((1))"),
                    Address = table.Column<string>(type: "varchar(200)", unicode: false, maxLength: 200, nullable: true),
                    IP4Address = table.Column<byte[]>(type: "binary(4)", fixedLength: true, maxLength: 4, nullable: true),
                    IP6Address = table.Column<byte[]>(type: "binary(16)", fixedLength: true, maxLength: 16, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Organiza__3214EC075E45C8BE", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Organizat__Paren__078C1F06",
                        column: x => x.ParentId,
                        principalSchema: "dbo",
                        principalTable: "Organization",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OvertimeLimit",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Code = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    MinHour = table.Column<decimal>(type: "decimal(4,2)", nullable: false),
                    MaxHour = table.Column<decimal>(type: "decimal(4,2)", nullable: false),
                    BeforeShift = table.Column<decimal>(type: "decimal(4,2)", nullable: false),
                    AfterShift = table.Column<decimal>(type: "decimal(4,2)", nullable: false),
                    MaxHourPerDay = table.Column<decimal>(type: "decimal(4,2)", nullable: false),
                    MaxHourPerWeek = table.Column<decimal>(type: "decimal(4,2)", nullable: false),
                    MaxHourPerMonth = table.Column<decimal>(type: "decimal(4,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Overtime__3214EC075A102769", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PermissionGroup",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Permissi__3214EC074E260E71", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Position",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Position__3214EC071AE0D7B8", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Routine",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Routine__3214EC0721871BE4", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Setting",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Value = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Setting__3214EC0741BB4BA1", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Shift",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Code = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "time(0)", precision: 0, nullable: true),
                    EndTime = table.Column<TimeSpan>(type: "time(0)", precision: 0, nullable: true),
                    AcrossMidnight = table.Column<bool>(type: "bit", nullable: false),
                    Duration = table.Column<TimeSpan>(type: "time(0)", precision: 0, nullable: true),
                    Type = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false, defaultValueSql: "('fixed')")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Shift__3214EC07D0B638DC", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tmp_Employee",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<double>(type: "float", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    OfficialNumber = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    DeviceEnrollNumber = table.Column<double>(type: "float", nullable: true),
                    PayrollNumber = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PhoneNumberVerified = table.Column<double>(type: "float", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    EmailVerified = table.Column<double>(type: "float", nullable: true),
                    LastOrganizationId = table.Column<double>(type: "float", nullable: true),
                    LastPositionId = table.Column<double>(type: "float", nullable: true),
                    CheckInStartMinute = table.Column<double>(type: "float", nullable: true),
                    CheckOutEndMinute = table.Column<double>(type: "float", nullable: true),
                    CheckInGraceMinute = table.Column<double>(type: "float", nullable: true),
                    CheckOutGraceMinute = table.Column<double>(type: "float", nullable: true),
                    OverTimeLimit = table.Column<double>(type: "float", nullable: true),
                    LastTransferOrJoinedDate = table.Column<double>(type: "float", nullable: true),
                    LastPromotionOrJoinedDate = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "tmp_Organization",
                schema: "dbo",
                columns: table => new
                {
                    BranchId = table.Column<long>(type: "bigint", nullable: true),
                    BranchName = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    UnderBranch = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "AttendanceLogTodays",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EnrollNumber = table.Column<long>(type: "bigint", nullable: false),
                    Addate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Bsdate = table.Column<int>(type: "int", nullable: false),
                    Timestamp = table.Column<TimeSpan>(type: "time", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BioTrackerId = table.Column<int>(type: "int", nullable: false),
                    VerifyMode = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttendanceLogTodays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttendanceLogTodays_BiometricTracker_BioTrackerId",
                        column: x => x.BioTrackerId,
                        principalSchema: "dbo",
                        principalTable: "BiometricTracker",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CalendarMonth",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    YearId = table.Column<int>(type: "int", nullable: false),
                    Month = table.Column<int>(type: "int", nullable: false),
                    TotalDays = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Calendar__3214EC07F0C60F2E", x => x.Id);
                    table.ForeignKey(
                        name: "FK__CalendarM__YearI__55009F39",
                        column: x => x.YearId,
                        principalSchema: "dbo",
                        principalTable: "CalendarYear",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Approver",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StatusId = table.Column<int>(type: "int", nullable: false),
                    GroupId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Approver__3214EC076E63F6D6", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Approver__GroupI__4E53A1AA",
                        column: x => x.GroupId,
                        principalSchema: "dbo",
                        principalTable: "Group",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Approver__Status__4D5F7D71",
                        column: x => x.StatusId,
                        principalSchema: "dbo",
                        principalTable: "ApprovalStatus",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RoleClaim",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleClaim", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoleClaim_IdentityRole_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "dbo",
                        principalTable: "IdentityRole",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserClaim",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserClaim", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserClaim_IdentityUser_UserId",
                        column: x => x.UserId,
                        principalSchema: "dbo",
                        principalTable: "IdentityUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserLogin",
                schema: "dbo",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLogin", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_UserLogin_IdentityUser_UserId",
                        column: x => x.UserId,
                        principalSchema: "dbo",
                        principalTable: "IdentityUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                schema: "dbo",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRole_IdentityRole_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "dbo",
                        principalTable: "IdentityRole",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRole_IdentityUser_UserId",
                        column: x => x.UserId,
                        principalSchema: "dbo",
                        principalTable: "IdentityUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserToken",
                schema: "dbo",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserToken", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_UserToken_IdentityUser_UserId",
                        column: x => x.UserId,
                        principalSchema: "dbo",
                        principalTable: "IdentityUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrganizationGroup",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupId = table.Column<long>(type: "bigint", nullable: false),
                    OrganizationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Organiza__3214EC0763FC1A66", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Organizat__Group__0880433F",
                        column: x => x.GroupId,
                        principalSchema: "dbo",
                        principalTable: "Group",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Organizat__Organ__09746778",
                        column: x => x.OrganizationId,
                        principalSchema: "dbo",
                        principalTable: "Organization",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OrganizationTag",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrganizationId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Value = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Organiza__3214EC079C35E391", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Organizat__Organ__0A688BB1",
                        column: x => x.OrganizationId,
                        principalSchema: "dbo",
                        principalTable: "Organization",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Permission",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    PermissionGroupId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Permissi__3214EC077185B6A0", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Permissio__Permi__11158940",
                        column: x => x.PermissionGroupId,
                        principalSchema: "dbo",
                        principalTable: "PermissionGroup",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PositionTag",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PositionId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Value = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Position__3214EC0742F9D1B3", x => x.Id);
                    table.ForeignKey(
                        name: "FK__PositionT__Posit__1209AD79",
                        column: x => x.PositionId,
                        principalSchema: "dbo",
                        principalTable: "Position",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MonthlyRoutine",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoutineId = table.Column<long>(type: "bigint", nullable: false),
                    ShiftId = table.Column<int>(type: "int", nullable: false),
                    Nth = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Specificity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__MonthlyR__3214EC0777585363", x => x.Id);
                    table.ForeignKey(
                        name: "FK__MonthlyRo__Routi__05A3D694",
                        column: x => x.RoutineId,
                        principalSchema: "dbo",
                        principalTable: "Routine",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__MonthlyRo__Shift__0697FACD",
                        column: x => x.ShiftId,
                        principalSchema: "dbo",
                        principalTable: "Shift",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ShiftBreak",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShiftId = table.Column<int>(type: "int", nullable: false),
                    BreakId = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "time(0)", precision: 0, nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time(0)", precision: 0, nullable: false),
                    AcrossMidnight = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ShiftBre__3214EC07135ACEF5", x => x.Id);
                    table.ForeignKey(
                        name: "FK__ShiftBrea__Break__1C873BEC",
                        column: x => x.BreakId,
                        principalSchema: "dbo",
                        principalTable: "Break",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__ShiftBrea__Shift__1B9317B3",
                        column: x => x.ShiftId,
                        principalSchema: "dbo",
                        principalTable: "Shift",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Calendar",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ADDate = table.Column<DateTime>(type: "date", nullable: false),
                    BSDate = table.Column<int>(type: "int", nullable: false),
                    MonthId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Calendar__3214EC07671827A5", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Calendar__MonthI__540C7B00",
                        column: x => x.MonthId,
                        principalSchema: "dbo",
                        principalTable: "CalendarMonth",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RolePermission",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    PermissionId = table.Column<long>(type: "bigint", nullable: false),
                    RoleId1 = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermission", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RolePermission_IdentityRole_RoleId1",
                        column: x => x.RoleId1,
                        principalSchema: "dbo",
                        principalTable: "IdentityRole",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RolePermission_Permission_PermissionId",
                        column: x => x.PermissionId,
                        principalSchema: "dbo",
                        principalTable: "Permission",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolePermission_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "dbo",
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BiometricLog",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EnrollNumber = table.Column<long>(type: "bigint", nullable: false),
                    CalendarId = table.Column<int>(type: "int", nullable: false),
                    Timestamp = table.Column<TimeSpan>(type: "time(0)", precision: 0, nullable: false),
                    InOutMode = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    VerifyMode = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    TrackerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Biometri__3214EC07AB4A2D29", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Biometric__Calen__4F47C5E3",
                        column: x => x.CalendarId,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Biometric__Track__503BEA1C",
                        column: x => x.TrackerId,
                        principalSchema: "dbo",
                        principalTable: "BiometricTracker",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Employee",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    OfficialNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DeviceEnrollNumber = table.Column<long>(type: "bigint", nullable: false),
                    PayrollNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Status = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    PhoneNumber = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    PhoneNumberVerified = table.Column<bool>(type: "bit", nullable: false),
                    Email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    EmailVerified = table.Column<bool>(type: "bit", nullable: false),
                    LastOrganizationId = table.Column<int>(type: "int", nullable: false),
                    LastPositionId = table.Column<int>(type: "int", nullable: false),
                    CheckInStartMinute = table.Column<int>(type: "int", nullable: false, defaultValueSql: "((60))"),
                    CheckOutEndMinute = table.Column<int>(type: "int", nullable: false, defaultValueSql: "((60))"),
                    CheckInGraceMinute = table.Column<int>(type: "int", nullable: false, defaultValueSql: "((15))"),
                    CheckOutGraceMinute = table.Column<int>(type: "int", nullable: false, defaultValueSql: "((5))"),
                    OverTimeLimit = table.Column<int>(type: "int", nullable: false, defaultValueSql: "((1))"),
                    LastTransferOrJoinedDate = table.Column<int>(type: "int", nullable: false),
                    LastPromotionOrJoinedDate = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Employee__3214EC079AE2E4B6", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Employee__LastOr__607251E5",
                        column: x => x.LastOrganizationId,
                        principalSchema: "dbo",
                        principalTable: "Organization",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Employee__LastPo__5D95E53A",
                        column: x => x.LastPositionId,
                        principalSchema: "dbo",
                        principalTable: "Position",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Employee__LastPr__5F7E2DAC",
                        column: x => x.LastPromotionOrJoinedDate,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Employee__LastTr__5E8A0973",
                        column: x => x.LastTransferOrJoinedDate,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Employee__OverTi__6166761E",
                        column: x => x.OverTimeLimit,
                        principalSchema: "dbo",
                        principalTable: "OvertimeLimit",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "HolidayCalendar",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HolidayId = table.Column<int>(type: "int", nullable: false),
                    GroupId = table.Column<long>(type: "bigint", nullable: false),
                    CalendarId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__HolidayC__3214EC07A4D4476B", x => x.Id);
                    table.ForeignKey(
                        name: "FK__HolidayCa__Calen__70A8B9AE",
                        column: x => x.CalendarId,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__HolidayCa__Group__6FB49575",
                        column: x => x.GroupId,
                        principalSchema: "dbo",
                        principalTable: "Group",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__HolidayCa__Holid__6EC0713C",
                        column: x => x.HolidayId,
                        principalSchema: "dbo",
                        principalTable: "Holiday",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Schedule",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoutineId = table.Column<long>(type: "bigint", nullable: false),
                    GroupId = table.Column<long>(type: "bigint", nullable: false),
                    StartDate = table.Column<int>(type: "int", nullable: false),
                    EndDate = table.Column<int>(type: "int", nullable: true),
                    RepeatYearly = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Schedule__3214EC077546E7AA", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Schedule__EndDat__17C286CF",
                        column: x => x.EndDate,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Schedule__GroupI__15DA3E5D",
                        column: x => x.GroupId,
                        principalSchema: "dbo",
                        principalTable: "Group",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Schedule__Routin__14E61A24",
                        column: x => x.RoutineId,
                        principalSchema: "dbo",
                        principalTable: "Routine",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__Schedule__StartD__16CE6296",
                        column: x => x.StartDate,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ScheduleOverride",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupId = table.Column<long>(type: "bigint", nullable: false),
                    CalendarId = table.Column<int>(type: "int", nullable: false),
                    ShiftId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Schedule__3214EC07CCF13374", x => x.Id);
                    table.ForeignKey(
                        name: "FK__ScheduleO__Calen__19AACF41",
                        column: x => x.CalendarId,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__ScheduleO__Group__18B6AB08",
                        column: x => x.GroupId,
                        principalSchema: "dbo",
                        principalTable: "Group",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__ScheduleO__Shift__1A9EF37A",
                        column: x => x.ShiftId,
                        principalSchema: "dbo",
                        principalTable: "Shift",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TrackerAssignment",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrackerId = table.Column<int>(type: "int", nullable: false),
                    OrganizationId = table.Column<int>(type: "int", nullable: false),
                    TrackingStartDate = table.Column<int>(type: "int", nullable: false),
                    TrackingEndDate = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__TrackerA__3214EC07566ABFD2", x => x.Id);
                    table.ForeignKey(
                        name: "FK__TrackerAs__Organ__1E6F845E",
                        column: x => x.OrganizationId,
                        principalSchema: "dbo",
                        principalTable: "Organization",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__TrackerAs__Track__1D7B6025",
                        column: x => x.TrackerId,
                        principalSchema: "dbo",
                        principalTable: "BiometricTracker",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__TrackerAs__Track__1F63A897",
                        column: x => x.TrackingStartDate,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__TrackerAs__Track__2057CCD0",
                        column: x => x.TrackingEndDate,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BreakLog",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CalendarId = table.Column<int>(type: "int", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    ShiftId = table.Column<int>(type: "int", nullable: false),
                    BreakOut = table.Column<TimeSpan>(type: "time(0)", precision: 0, nullable: false),
                    BreakIn = table.Column<TimeSpan>(type: "time(0)", precision: 0, nullable: true),
                    AcrossMidnight = table.Column<bool>(type: "bit", nullable: false),
                    AutomaticShift = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__BreakLog__3214EC074D7B30BB", x => x.Id);
                    table.ForeignKey(
                        name: "FK__BreakLog__Calend__51300E55",
                        column: x => x.CalendarId,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__BreakLog__Employ__5224328E",
                        column: x => x.EmployeeId,
                        principalSchema: "dbo",
                        principalTable: "Employee",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__BreakLog__ShiftI__531856C7",
                        column: x => x.ShiftId,
                        principalSchema: "dbo",
                        principalTable: "Shift",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CheckInOutLog",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CalendarId = table.Column<int>(type: "int", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    ShiftId = table.Column<int>(type: "int", nullable: false),
                    CheckIn = table.Column<TimeSpan>(type: "time(0)", precision: 0, nullable: false),
                    CheckOut = table.Column<TimeSpan>(type: "time(0)", precision: 0, nullable: true),
                    AcrossMidnight = table.Column<bool>(type: "bit", nullable: false),
                    AutomaticShift = table.Column<bool>(type: "bit", nullable: false),
                    EmpOrganizationId = table.Column<int>(type: "int", nullable: false),
                    CInOrganizationId = table.Column<int>(type: "int", nullable: false),
                    COutOrganizationId = table.Column<int>(type: "int", nullable: false),
                    CInSourceType = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    CInSourceId = table.Column<long>(type: "bigint", nullable: false),
                    COutSourceType = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    COutSourceId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CheckInO__3214EC07D4D844F1", x => x.Id);
                    table.ForeignKey(
                        name: "FK__CheckInOu__CInOr__59C55456",
                        column: x => x.CInOrganizationId,
                        principalSchema: "dbo",
                        principalTable: "Organization",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__CheckInOu__COutO__5AB9788F",
                        column: x => x.COutOrganizationId,
                        principalSchema: "dbo",
                        principalTable: "Organization",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__CheckInOu__Calen__55F4C372",
                        column: x => x.CalendarId,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__CheckInOu__EmpOr__58D1301D",
                        column: x => x.EmpOrganizationId,
                        principalSchema: "dbo",
                        principalTable: "Organization",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__CheckInOu__Emplo__56E8E7AB",
                        column: x => x.EmployeeId,
                        principalSchema: "dbo",
                        principalTable: "Employee",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__CheckInOu__Shift__57DD0BE4",
                        column: x => x.ShiftId,
                        principalSchema: "dbo",
                        principalTable: "Shift",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CheckInOutRangeOverride",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    CalendarId = table.Column<int>(type: "int", nullable: false),
                    CheckInStartMinute = table.Column<int>(type: "int", nullable: false, defaultValueSql: "((60))"),
                    CheckOutEndMinute = table.Column<int>(type: "int", nullable: false, defaultValueSql: "((60))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CheckInO__3214EC071F76BE39", x => x.Id);
                    table.ForeignKey(
                        name: "FK__CheckInOu__Calen__5CA1C101",
                        column: x => x.CalendarId,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__CheckInOu__Emplo__5BAD9CC8",
                        column: x => x.EmployeeId,
                        principalSchema: "dbo",
                        principalTable: "Employee",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeGroup",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Employee__3214EC0769BC9960", x => x.Id);
                    table.ForeignKey(
                        name: "FK__EmployeeG__Emplo__634EBE90",
                        column: x => x.EmployeeId,
                        principalSchema: "dbo",
                        principalTable: "Employee",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__EmployeeG__Group__625A9A57",
                        column: x => x.GroupId,
                        principalSchema: "dbo",
                        principalTable: "Group",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeePosition",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    PositionId = table.Column<int>(type: "int", nullable: true),
                    StartDate = table.Column<int>(type: "int", nullable: false),
                    EndDate = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Employee__3214EC07E730E0F4", x => x.Id);
                    table.ForeignKey(
                        name: "FK__EmployeeP__Emplo__6442E2C9",
                        column: x => x.EmployeeId,
                        principalSchema: "dbo",
                        principalTable: "Employee",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__EmployeeP__EndDa__671F4F74",
                        column: x => x.EndDate,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__EmployeeP__Posit__65370702",
                        column: x => x.PositionId,
                        principalSchema: "dbo",
                        principalTable: "Position",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__EmployeeP__Start__662B2B3B",
                        column: x => x.StartDate,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeTag",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Value = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Employee__3214EC073740D1E6", x => x.Id);
                    table.ForeignKey(
                        name: "FK__EmployeeT__Emplo__681373AD",
                        column: x => x.EmployeeId,
                        principalSchema: "dbo",
                        principalTable: "Employee",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeTransfer",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    OrganizationId = table.Column<int>(type: "int", nullable: true),
                    StartDate = table.Column<int>(type: "int", nullable: false),
                    EndDate = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Employee__3214EC071AE7DD95", x => x.Id);
                    table.ForeignKey(
                        name: "FK__EmployeeT__Emplo__690797E6",
                        column: x => x.EmployeeId,
                        principalSchema: "dbo",
                        principalTable: "Employee",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__EmployeeT__EndDa__6BE40491",
                        column: x => x.EndDate,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__EmployeeT__Organ__69FBBC1F",
                        column: x => x.OrganizationId,
                        principalSchema: "dbo",
                        principalTable: "Organization",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__EmployeeT__Start__6AEFE058",
                        column: x => x.StartDate,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "GraceTimeOverride",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    CalendarId = table.Column<int>(type: "int", nullable: false),
                    CheckInGraceMinute = table.Column<int>(type: "int", nullable: false, defaultValueSql: "((15))"),
                    CheckOutGraceMinute = table.Column<int>(type: "int", nullable: false, defaultValueSql: "((5))")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__GraceTim__3214EC07E8F8FB37", x => x.Id);
                    table.ForeignKey(
                        name: "FK__GraceTime__Calen__6DCC4D03",
                        column: x => x.CalendarId,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__GraceTime__Emplo__6CD828CA",
                        column: x => x.EmployeeId,
                        principalSchema: "dbo",
                        principalTable: "Employee",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LeaveBalance",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    LeaveId = table.Column<long>(type: "bigint", nullable: false),
                    Source = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    PlusOrMinus = table.Column<int>(type: "int", nullable: false),
                    Duration = table.Column<decimal>(type: "decimal(6,2)", nullable: false),
                    EffectiveDate = table.Column<int>(type: "int", nullable: false),
                    ExpiryDate = table.Column<int>(type: "int", nullable: true),
                    Remarks = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    TransactionId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__LeaveBal__3214EC07EF9DA1B8", x => x.Id);
                    table.ForeignKey(
                        name: "FK__LeaveBala__Effec__73852659",
                        column: x => x.EffectiveDate,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__LeaveBala__Emplo__719CDDE7",
                        column: x => x.EmployeeId,
                        principalSchema: "dbo",
                        principalTable: "Employee",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__LeaveBala__Expir__74794A92",
                        column: x => x.ExpiryDate,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__LeaveBala__Leave__72910220",
                        column: x => x.LeaveId,
                        principalSchema: "dbo",
                        principalTable: "Leave",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LeaveTaken",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LeaveId = table.Column<long>(type: "bigint", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    StartDate = table.Column<int>(type: "int", nullable: false),
                    EndDate = table.Column<int>(type: "int", nullable: false),
                    DurationEachDay = table.Column<decimal>(type: "decimal(6,2)", nullable: false),
                    WhichSlot = table.Column<int>(type: "int", nullable: true),
                    GrossDuration = table.Column<decimal>(type: "decimal(6,2)", nullable: false),
                    NetDuration = table.Column<decimal>(type: "decimal(6,2)", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    ApprovalStatusId = table.Column<int>(type: "int", nullable: false),
                    ApprovalGroupId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__LeaveTak__3214EC07542798D6", x => x.Id);
                    table.ForeignKey(
                        name: "FK__LeaveTake__Appro__7B264821",
                        column: x => x.ApprovalStatusId,
                        principalSchema: "dbo",
                        principalTable: "ApprovalStatus",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__LeaveTake__Appro__7C1A6C5A",
                        column: x => x.ApprovalGroupId,
                        principalSchema: "dbo",
                        principalTable: "Group",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__LeaveTake__Emplo__7849DB76",
                        column: x => x.EmployeeId,
                        principalSchema: "dbo",
                        principalTable: "Employee",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__LeaveTake__EndDa__7A3223E8",
                        column: x => x.EndDate,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__LeaveTake__Leave__7755B73D",
                        column: x => x.LeaveId,
                        principalSchema: "dbo",
                        principalTable: "Leave",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__LeaveTake__Start__793DFFAF",
                        column: x => x.StartDate,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ManualLog",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CalendarId = table.Column<int>(type: "int", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    Timestamp = table.Column<TimeSpan>(type: "time(0)", precision: 0, nullable: false),
                    InOutMode = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    InOutOrganizationId = table.Column<int>(type: "int", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    ApprovalStatusId = table.Column<int>(type: "int", nullable: false),
                    ApproverGroupId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ManualLo__3214EC0778657383", x => x.Id);
                    table.ForeignKey(
                        name: "FK__ManualLog__Appro__03BB8E22",
                        column: x => x.ApprovalStatusId,
                        principalSchema: "dbo",
                        principalTable: "ApprovalStatus",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__ManualLog__Appro__04AFB25B",
                        column: x => x.ApproverGroupId,
                        principalSchema: "dbo",
                        principalTable: "Group",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__ManualLog__Calen__00DF2177",
                        column: x => x.CalendarId,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__ManualLog__Emplo__01D345B0",
                        column: x => x.EmployeeId,
                        principalSchema: "dbo",
                        principalTable: "Employee",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__ManualLog__InOut__02C769E9",
                        column: x => x.InOutOrganizationId,
                        principalSchema: "dbo",
                        principalTable: "Organization",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OvertimeLimitOverride",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: false),
                    CalendarId = table.Column<int>(type: "int", nullable: false),
                    OverTimeLimitId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Overtime__3214EC074AA7F19C", x => x.Id);
                    table.ForeignKey(
                        name: "FK__OvertimeL__Calen__0C50D423",
                        column: x => x.CalendarId,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__OvertimeL__Emplo__0B5CAFEA",
                        column: x => x.EmployeeId,
                        principalSchema: "dbo",
                        principalTable: "Employee",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__OvertimeL__OverT__0D44F85C",
                        column: x => x.OverTimeLimitId,
                        principalSchema: "dbo",
                        principalTable: "OvertimeLimit",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OvertimeLog",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CalendarId = table.Column<int>(type: "int", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    ShiftId = table.Column<int>(type: "int", nullable: false),
                    OvertimeIn = table.Column<TimeSpan>(type: "time(0)", precision: 0, nullable: false),
                    OvertimeOut = table.Column<TimeSpan>(type: "time(0)", precision: 0, nullable: true),
                    AcrossMidnight = table.Column<bool>(type: "bit", nullable: false),
                    AutomaticShift = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Overtime__3214EC07047ED427", x => x.Id);
                    table.ForeignKey(
                        name: "FK__OvertimeL__Calen__0E391C95",
                        column: x => x.CalendarId,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__OvertimeL__Emplo__0F2D40CE",
                        column: x => x.EmployeeId,
                        principalSchema: "dbo",
                        principalTable: "Employee",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__OvertimeL__Shift__10216507",
                        column: x => x.ShiftId,
                        principalSchema: "dbo",
                        principalTable: "Shift",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "User",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberVerified = table.Column<bool>(type: "bit", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailVerified = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    EmployeeId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalSchema: "dbo",
                        principalTable: "Employee",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LeaveEarningPolicy",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LeaveId = table.Column<long>(type: "bigint", nullable: false),
                    EligibleGroupId = table.Column<long>(type: "bigint", nullable: true),
                    Frequency = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Expiry = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    VaryBy = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    DurationOrEarningRatio = table.Column<decimal>(type: "decimal(6,2)", nullable: false),
                    RoundOffDecimal = table.Column<bool>(type: "bit", nullable: false),
                    MaxDurationPerEarning = table.Column<decimal>(type: "decimal(6,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__LeaveEar__3214EC07F586DF74", x => x.Id);
                    table.ForeignKey(
                        name: "FK__LeaveEarn__Eligi__76619304",
                        column: x => x.EligibleGroupId,
                        principalSchema: "dbo",
                        principalTable: "EmployeeGroup",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__LeaveEarn__Leave__756D6ECB",
                        column: x => x.LeaveId,
                        principalSchema: "dbo",
                        principalTable: "Leave",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LeaveTakenPolicy",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LeaveId = table.Column<long>(type: "bigint", nullable: false),
                    EligibleGroupId = table.Column<long>(type: "bigint", nullable: true),
                    MinDuration = table.Column<decimal>(type: "decimal(6,2)", nullable: false),
                    MaxDuration = table.Column<decimal>(type: "decimal(6,2)", nullable: false),
                    MinDaysBetween = table.Column<int>(type: "int", nullable: false),
                    MaxTimesInLeaveYear = table.Column<int>(type: "int", nullable: false),
                    MaxTimesInServicePeriod = table.Column<int>(type: "int", nullable: false),
                    ExcludeHoliday = table.Column<bool>(type: "bit", nullable: false),
                    ExcludeDayOff = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__LeaveTak__3214EC0776E97E33", x => x.Id);
                    table.ForeignKey(
                        name: "FK__LeaveTake__Eligi__7E02B4CC",
                        column: x => x.EligibleGroupId,
                        principalSchema: "dbo",
                        principalTable: "EmployeeGroup",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__LeaveTake__Leave__7D0E9093",
                        column: x => x.LeaveId,
                        principalSchema: "dbo",
                        principalTable: "Leave",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LeaveYearClosingPolicy",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LeaveId = table.Column<long>(type: "bigint", nullable: false),
                    EligibleGroupId = table.Column<long>(type: "bigint", nullable: true),
                    MaxCarryForwardable = table.Column<decimal>(type: "decimal(6,2)", nullable: false),
                    MaxEncashable = table.Column<decimal>(type: "decimal(6,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__LeaveYea__3214EC0754B1BF23", x => x.Id);
                    table.ForeignKey(
                        name: "FK__LeaveYear__Eligi__7FEAFD3E",
                        column: x => x.EligibleGroupId,
                        principalSchema: "dbo",
                        principalTable: "EmployeeGroup",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__LeaveYear__Leave__7EF6D905",
                        column: x => x.LeaveId,
                        principalSchema: "dbo",
                        principalTable: "Leave",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ApprovalHistory",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RecordTable = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    RecordId = table.Column<long>(type: "bigint", nullable: false),
                    CalendarId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    StatusId = table.Column<int>(type: "int", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Approval__3214EC0765C1A174", x => x.Id);
                    table.ForeignKey(
                        name: "FK__ApprovalH__Calen__489AC854",
                        column: x => x.CalendarId,
                        principalSchema: "dbo",
                        principalTable: "Calendar",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__ApprovalH__Statu__4A8310C6",
                        column: x => x.StatusId,
                        principalSchema: "dbo",
                        principalTable: "ApprovalStatus",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK__ApprovalH__UserI__498EEC8D",
                        column: x => x.UserId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserAccess",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    GroupId = table.Column<long>(type: "bigint", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    IdentityRoleId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAccess", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserAccess_Group_GroupId",
                        column: x => x.GroupId,
                        principalSchema: "dbo",
                        principalTable: "Group",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAccess_IdentityRole_IdentityRoleId",
                        column: x => x.IdentityRoleId,
                        principalSchema: "dbo",
                        principalTable: "IdentityRole",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserAccess_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "dbo",
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAccess_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalHistory_CalendarId",
                schema: "dbo",
                table: "ApprovalHistory",
                column: "CalendarId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalHistory_StatusId",
                schema: "dbo",
                table: "ApprovalHistory",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalHistory_UserId",
                schema: "dbo",
                table: "ApprovalHistory",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalStatus_BackFlowId",
                schema: "dbo",
                table: "ApprovalStatus",
                column: "BackFlowId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalStatus_ParentId",
                schema: "dbo",
                table: "ApprovalStatus",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Approver_GroupId",
                schema: "dbo",
                table: "Approver",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Approver_StatusId",
                schema: "dbo",
                table: "Approver",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceLogTodays_BioTrackerId",
                schema: "dbo",
                table: "AttendanceLogTodays",
                column: "BioTrackerId");

            migrationBuilder.CreateIndex(
                name: "IX_BiometricLog_CalendarId",
                schema: "dbo",
                table: "BiometricLog",
                column: "CalendarId");

            migrationBuilder.CreateIndex(
                name: "IX_BiometricLog_TrackerId",
                schema: "dbo",
                table: "BiometricLog",
                column: "TrackerId");

            migrationBuilder.CreateIndex(
                name: "UQ__Biometri__F0C25BE0A67B00FB",
                schema: "dbo",
                table: "BiometricTracker",
                column: "IPAddress",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Break__737584F64C43D759",
                schema: "dbo",
                table: "Break",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Break__A25C5AA7A604FE64",
                schema: "dbo",
                table: "Break",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BreakLog_CalendarId",
                schema: "dbo",
                table: "BreakLog",
                column: "CalendarId");

            migrationBuilder.CreateIndex(
                name: "IX_BreakLog_EmployeeId",
                schema: "dbo",
                table: "BreakLog",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_BreakLog_ShiftId",
                schema: "dbo",
                table: "BreakLog",
                column: "ShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_Calendar_MonthId",
                schema: "dbo",
                table: "Calendar",
                column: "MonthId");

            migrationBuilder.CreateIndex(
                name: "IX_CalendarMonth_YearId",
                schema: "dbo",
                table: "CalendarMonth",
                column: "YearId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckInOutLog_CalendarId",
                schema: "dbo",
                table: "CheckInOutLog",
                column: "CalendarId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckInOutLog_CInOrganizationId",
                schema: "dbo",
                table: "CheckInOutLog",
                column: "CInOrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckInOutLog_COutOrganizationId",
                schema: "dbo",
                table: "CheckInOutLog",
                column: "COutOrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckInOutLog_EmployeeId",
                schema: "dbo",
                table: "CheckInOutLog",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckInOutLog_EmpOrganizationId",
                schema: "dbo",
                table: "CheckInOutLog",
                column: "EmpOrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckInOutLog_ShiftId",
                schema: "dbo",
                table: "CheckInOutLog",
                column: "ShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckInOutRangeOverride_CalendarId",
                schema: "dbo",
                table: "CheckInOutRangeOverride",
                column: "CalendarId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckInOutRangeOverride_EmployeeId",
                schema: "dbo",
                table: "CheckInOutRangeOverride",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_LastOrganizationId",
                schema: "dbo",
                table: "Employee",
                column: "LastOrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_LastPositionId",
                schema: "dbo",
                table: "Employee",
                column: "LastPositionId");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_LastPromotionOrJoinedDate",
                schema: "dbo",
                table: "Employee",
                column: "LastPromotionOrJoinedDate");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_LastTransferOrJoinedDate",
                schema: "dbo",
                table: "Employee",
                column: "LastTransferOrJoinedDate");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_OverTimeLimit",
                schema: "dbo",
                table: "Employee",
                column: "OverTimeLimit");

            migrationBuilder.CreateIndex(
                name: "UQ__Employee__54765324498C0968",
                schema: "dbo",
                table: "Employee",
                column: "DeviceEnrollNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Employee__D1C5B2C107025AE1",
                schema: "dbo",
                table: "Employee",
                column: "PayrollNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Employee__DE1F8998617CA2E2",
                schema: "dbo",
                table: "Employee",
                column: "OfficialNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeGroup_EmployeeId",
                schema: "dbo",
                table: "EmployeeGroup",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeGroup_GroupId",
                schema: "dbo",
                table: "EmployeeGroup",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePosition_EmployeeId",
                schema: "dbo",
                table: "EmployeePosition",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePosition_EndDate",
                schema: "dbo",
                table: "EmployeePosition",
                column: "EndDate");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePosition_PositionId",
                schema: "dbo",
                table: "EmployeePosition",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePosition_StartDate",
                schema: "dbo",
                table: "EmployeePosition",
                column: "StartDate");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTag_EmployeeId",
                schema: "dbo",
                table: "EmployeeTag",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTransfer_EmployeeId",
                schema: "dbo",
                table: "EmployeeTransfer",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTransfer_EndDate",
                schema: "dbo",
                table: "EmployeeTransfer",
                column: "EndDate");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTransfer_OrganizationId",
                schema: "dbo",
                table: "EmployeeTransfer",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeTransfer_StartDate",
                schema: "dbo",
                table: "EmployeeTransfer",
                column: "StartDate");

            migrationBuilder.CreateIndex(
                name: "IX_GraceTimeOverride_CalendarId",
                schema: "dbo",
                table: "GraceTimeOverride",
                column: "CalendarId");

            migrationBuilder.CreateIndex(
                name: "IX_GraceTimeOverride_EmployeeId",
                schema: "dbo",
                table: "GraceTimeOverride",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "UQ__Group__737584F643237BC3",
                schema: "dbo",
                table: "Group",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Holiday__737584F68AA185C2",
                schema: "dbo",
                table: "Holiday",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_HolidayCalendar_CalendarId",
                schema: "dbo",
                table: "HolidayCalendar",
                column: "CalendarId");

            migrationBuilder.CreateIndex(
                name: "IX_HolidayCalendar_GroupId",
                schema: "dbo",
                table: "HolidayCalendar",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_HolidayCalendar_HolidayId",
                schema: "dbo",
                table: "HolidayCalendar",
                column: "HolidayId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                schema: "dbo",
                table: "IdentityRole",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                schema: "dbo",
                table: "IdentityUser",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                schema: "dbo",
                table: "IdentityUser",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveBalance_EffectiveDate",
                schema: "dbo",
                table: "LeaveBalance",
                column: "EffectiveDate");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveBalance_EmployeeId",
                schema: "dbo",
                table: "LeaveBalance",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveBalance_ExpiryDate",
                schema: "dbo",
                table: "LeaveBalance",
                column: "ExpiryDate");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveBalance_LeaveId",
                schema: "dbo",
                table: "LeaveBalance",
                column: "LeaveId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveEarningPolicy_EligibleGroupId",
                schema: "dbo",
                table: "LeaveEarningPolicy",
                column: "EligibleGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveEarningPolicy_LeaveId",
                schema: "dbo",
                table: "LeaveEarningPolicy",
                column: "LeaveId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTaken_ApprovalGroupId",
                schema: "dbo",
                table: "LeaveTaken",
                column: "ApprovalGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTaken_ApprovalStatusId",
                schema: "dbo",
                table: "LeaveTaken",
                column: "ApprovalStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTaken_EmployeeId",
                schema: "dbo",
                table: "LeaveTaken",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTaken_EndDate",
                schema: "dbo",
                table: "LeaveTaken",
                column: "EndDate");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTaken_LeaveId",
                schema: "dbo",
                table: "LeaveTaken",
                column: "LeaveId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTaken_StartDate",
                schema: "dbo",
                table: "LeaveTaken",
                column: "StartDate");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTakenPolicy_EligibleGroupId",
                schema: "dbo",
                table: "LeaveTakenPolicy",
                column: "EligibleGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTakenPolicy_LeaveId",
                schema: "dbo",
                table: "LeaveTakenPolicy",
                column: "LeaveId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveYearClosingPolicy_EligibleGroupId",
                schema: "dbo",
                table: "LeaveYearClosingPolicy",
                column: "EligibleGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveYearClosingPolicy_LeaveId",
                schema: "dbo",
                table: "LeaveYearClosingPolicy",
                column: "LeaveId");

            migrationBuilder.CreateIndex(
                name: "IX_ManualLog_ApprovalStatusId",
                schema: "dbo",
                table: "ManualLog",
                column: "ApprovalStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_ManualLog_ApproverGroupId",
                schema: "dbo",
                table: "ManualLog",
                column: "ApproverGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ManualLog_CalendarId",
                schema: "dbo",
                table: "ManualLog",
                column: "CalendarId");

            migrationBuilder.CreateIndex(
                name: "IX_ManualLog_EmployeeId",
                schema: "dbo",
                table: "ManualLog",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_ManualLog_InOutOrganizationId",
                schema: "dbo",
                table: "ManualLog",
                column: "InOutOrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_MonthlyRoutine_RoutineId",
                schema: "dbo",
                table: "MonthlyRoutine",
                column: "RoutineId");

            migrationBuilder.CreateIndex(
                name: "IX_MonthlyRoutine_ShiftId",
                schema: "dbo",
                table: "MonthlyRoutine",
                column: "ShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_Organization_ParentId",
                schema: "dbo",
                table: "Organization",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "UQ__Organiza__737584F63E349EE0",
                schema: "dbo",
                table: "Organization",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationGroup_GroupId",
                schema: "dbo",
                table: "OrganizationGroup",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationGroup_OrganizationId",
                schema: "dbo",
                table: "OrganizationGroup",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationTag_OrganizationId",
                schema: "dbo",
                table: "OrganizationTag",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "UQ__Overtime__737584F6AF07DDF1",
                schema: "dbo",
                table: "OvertimeLimit",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Overtime__A25C5AA75D2933A3",
                schema: "dbo",
                table: "OvertimeLimit",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OvertimeLimitOverride_CalendarId",
                schema: "dbo",
                table: "OvertimeLimitOverride",
                column: "CalendarId");

            migrationBuilder.CreateIndex(
                name: "IX_OvertimeLimitOverride_EmployeeId",
                schema: "dbo",
                table: "OvertimeLimitOverride",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_OvertimeLimitOverride_OverTimeLimitId",
                schema: "dbo",
                table: "OvertimeLimitOverride",
                column: "OverTimeLimitId");

            migrationBuilder.CreateIndex(
                name: "IX_OvertimeLog_CalendarId",
                schema: "dbo",
                table: "OvertimeLog",
                column: "CalendarId");

            migrationBuilder.CreateIndex(
                name: "IX_OvertimeLog_EmployeeId",
                schema: "dbo",
                table: "OvertimeLog",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_OvertimeLog_ShiftId",
                schema: "dbo",
                table: "OvertimeLog",
                column: "ShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_Permission_PermissionGroupId",
                schema: "dbo",
                table: "Permission",
                column: "PermissionGroupId");

            migrationBuilder.CreateIndex(
                name: "UQ__Permissi__737584F644BDC172",
                schema: "dbo",
                table: "PermissionGroup",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Position__737584F65F60F58C",
                schema: "dbo",
                table: "Position",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PositionTag_PositionId",
                schema: "dbo",
                table: "PositionTag",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleClaim_RoleId",
                schema: "dbo",
                table: "RoleClaim",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermission_PermissionId",
                schema: "dbo",
                table: "RolePermission",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermission_RoleId",
                schema: "dbo",
                table: "RolePermission",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermission_RoleId1",
                schema: "dbo",
                table: "RolePermission",
                column: "RoleId1");

            migrationBuilder.CreateIndex(
                name: "IX_Schedule_EndDate",
                schema: "dbo",
                table: "Schedule",
                column: "EndDate");

            migrationBuilder.CreateIndex(
                name: "IX_Schedule_GroupId",
                schema: "dbo",
                table: "Schedule",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedule_RoutineId",
                schema: "dbo",
                table: "Schedule",
                column: "RoutineId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedule_StartDate",
                schema: "dbo",
                table: "Schedule",
                column: "StartDate");

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleOverride_CalendarId",
                schema: "dbo",
                table: "ScheduleOverride",
                column: "CalendarId");

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleOverride_GroupId",
                schema: "dbo",
                table: "ScheduleOverride",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleOverride_ShiftId",
                schema: "dbo",
                table: "ScheduleOverride",
                column: "ShiftId");

            migrationBuilder.CreateIndex(
                name: "UQ__Setting__737584F603EB23B5",
                schema: "dbo",
                table: "Setting",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Shift__737584F6D83E515A",
                schema: "dbo",
                table: "Shift",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Shift__A25C5AA729B8D13D",
                schema: "dbo",
                table: "Shift",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ShiftBreak_BreakId",
                schema: "dbo",
                table: "ShiftBreak",
                column: "BreakId");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftBreak_ShiftId",
                schema: "dbo",
                table: "ShiftBreak",
                column: "ShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackerAssignment_OrganizationId",
                schema: "dbo",
                table: "TrackerAssignment",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackerAssignment_TrackerId",
                schema: "dbo",
                table: "TrackerAssignment",
                column: "TrackerId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackerAssignment_TrackingEndDate",
                schema: "dbo",
                table: "TrackerAssignment",
                column: "TrackingEndDate");

            migrationBuilder.CreateIndex(
                name: "IX_TrackerAssignment_TrackingStartDate",
                schema: "dbo",
                table: "TrackerAssignment",
                column: "TrackingStartDate");

            migrationBuilder.CreateIndex(
                name: "IX_User_EmployeeId",
                schema: "dbo",
                table: "User",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAccess_GroupId",
                schema: "dbo",
                table: "UserAccess",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAccess_IdentityRoleId",
                schema: "dbo",
                table: "UserAccess",
                column: "IdentityRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAccess_RoleId",
                schema: "dbo",
                table: "UserAccess",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAccess_UserId",
                schema: "dbo",
                table: "UserAccess",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserClaim_UserId",
                schema: "dbo",
                table: "UserClaim",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLogin_UserId",
                schema: "dbo",
                table: "UserLogin",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_RoleId",
                schema: "dbo",
                table: "UserRole",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApprovalHistory",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Approver",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "AttendanceLogTodays",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "BiometricLog",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "BreakLog",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "CheckInOutLog",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "CheckInOutRangeOverride",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "EmployeePosition",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "EmployeeTag",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "EmployeeTransfer",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "GraceTimeOverride",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "HolidayCalendar",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "LeaveBalance",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "LeaveEarningPolicy",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "LeaveTaken",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "LeaveTakenPolicy",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "LeaveYearClosingPolicy",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "ManualLog",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "MonthlyRoutine",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "OrganizationGroup",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "OrganizationTag",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "OvertimeLimitOverride",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "OvertimeLog",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "PositionTag",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "RoleClaim",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "RolePermission",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Schedule",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "ScheduleOverride",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Setting",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "ShiftBreak",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "tmp_Employee",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "tmp_Organization",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "TrackerAssignment",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UserAccess",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UserClaim",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UserLogin",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UserRole",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UserToken",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Holiday",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "EmployeeGroup",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Leave",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "ApprovalStatus",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Permission",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Routine",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Break",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Shift",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "BiometricTracker",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Role",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "User",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "IdentityRole",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "IdentityUser",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Group",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "PermissionGroup",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Employee",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Organization",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Position",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Calendar",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "OvertimeLimit",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "CalendarMonth",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "CalendarYear",
                schema: "dbo");
        }
    }
}
