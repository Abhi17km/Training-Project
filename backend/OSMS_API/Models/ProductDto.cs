namespace OSMS_API.Models
{
    public class ProductDto
    {
        public string ProductName { get; set; } = string.Empty;
        public string? ProductDesc { get; set; }
        public decimal ProductPrice { get; set; }
        public string? ImageUrl { get; set; }
        public int CategoryId { get; set; }
    }
}
