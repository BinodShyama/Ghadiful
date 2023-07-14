CREATE TABLE [dbo].[OrganizationUnits]
(
	Id int primary key identity(1,1) not null, 
	Name varchar(100) unique not null,
	ParentId int references OrganizationUnits(Id) null,
	IsActive bit default(1),	
        [Address] varchar(200) null,
        IP4Address binary(4), 
	IP6Address binary(16),
	Geolocation geography null
)
