create table [dbo].Employee
(
	[Id] bigint primary key identity(1,1) not null,
	[Name] varchar(100) not null,		
	[OfficialNumber] nvarchar(100) unique not null, 
	[DeviceEnrollNumber] bigint unique not null,
	[PayrollNumber] nvarchar(100) unique not null, 	
	[Status] varchar(100) not null,
	[PhoneNumber] varchar(100) null,
	[PhoneNumberVerified] bit default(0) not null,	
	[Email] varchar(100) null,
	[EmailVerified] bit default(0) not null	
)