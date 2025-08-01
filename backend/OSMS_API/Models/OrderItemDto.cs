namespace OSMS_API.Models
{
    public class OrderItemDto
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }

        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string? ProductName { get; set; }
    }

}
