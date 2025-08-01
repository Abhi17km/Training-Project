using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace OSMS_DAL.Models;

public partial class Customer
{
    
    public int UserId { get; set; }

    public string? Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Phone { get; set; }

    public DateTime? CreatedAt { get; set; }


    [JsonIgnore]
    public virtual ICollection<CartItemDto> CartItems { get; set; } = new List<CartItemDto>();
    [JsonIgnore]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
