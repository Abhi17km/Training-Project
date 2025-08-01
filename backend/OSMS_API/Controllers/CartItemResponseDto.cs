namespace OSMS_API.Controllers
{
    public class CartItemResponseDto
    {
        public int CartId { get; set; }
        public int Quantity { get; set; }

        // Optional: expose basic product info without full object to avoid circular reference
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public decimal ProductPrice { get; set; }
    }

}
