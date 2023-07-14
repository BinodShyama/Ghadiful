CREATE TABLE [dbo].[EmployeeTag]
(
	Id bigint primary key identity(1,1) not null,
	EmployeeId bigint references Employee(Id) not null,
	Name varchar(100) not null,
	Value nvarchar(100) not null
)
