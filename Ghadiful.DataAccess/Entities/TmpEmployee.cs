using System;
using System.Collections.Generic;

namespace Ghadiful.DataAccess.Entities;

public partial class TmpEmployee
{
    public long? Id { get; set; }

    public string? Name { get; set; }

    public string? OfficialNumber { get; set; }

    public long? DeviceEnrollNumber { get; set; }

    public string? PayrollNumber { get; set; }

    public string? Status { get; set; }

    public string? PhoneNumber { get; set; }

    public bool? PhoneNumberVerified { get; set; }

    public string? Email { get; set; }

    public bool? EmailVerified { get; set; }

    public long? LastOrganizationId { get; set; }

    public long? LastPositionId { get; set; }

    public decimal? CheckInStartMinute { get; set; }

    public decimal? CheckOutEndMinute { get; set; }

    public decimal? CheckInGraceMinute { get; set; }

    public decimal? CheckOutGraceMinute { get; set; }

    public int? OverTimeLimit { get; set; }

    public int? LastTransferOrJoinedDate { get; set; }

    public int? LastPromotionOrJoinedDate { get; set; }
}
