using System;
using System.Collections.Generic;

namespace OSMS_DAL.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public int UserId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public decimal TotalAmount { get; set; }

    public string? DeliveryStatus { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual Customer User { get; set; } = null!;
}
