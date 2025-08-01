using System;
using System.Collections.Generic;

namespace OSMS_DAL.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public string ProductName { get; set; } = null!;

    public string? ProductDesc { get; set; }

    public decimal ProductPrice { get; set; }

    public int CategoryId { get; set; }

    public string? ImageUrl { get; set; }

    public virtual ICollection<CartItemDto> CartItems { get; set; } = new List<CartItemDto>();

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
