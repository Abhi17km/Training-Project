using System;
using System.Collections.Generic;

namespace OSMS_DAL.Models;

public partial class CartItemDto
{
    public int CartId { get; set; }

    public int UserId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual Customer User { get; set; } = null!;
}
