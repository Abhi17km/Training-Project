using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OSMS_API.Models; // Make sure to place ProductDto here
using OSMS_DAL.Models;
using OSMS_Repo.REPO;
using OSMS_REPO.REPO;

namespace OSMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProduct _product;

        public ProductController(IProduct product)
        {
            _product = product ?? throw new ArgumentNullException(nameof(product), "Product repository is not initialized.");
        }

        // Only Admins can add products
        [Authorize(Roles = "Admin")]
        [HttpPost("AddProduct")]
        public IActionResult AddProduct([FromBody] ProductDto dto)
        {
            if (dto == null)
                return BadRequest("Product data is required.");

            try
            {
                if (string.IsNullOrWhiteSpace(dto.ProductName) || dto.ProductPrice <= 0 || dto.CategoryId <= 0)
                    return BadRequest("Product details are incomplete or invalid.");

                var product = new Product
                {
                    ProductName = dto.ProductName,
                    ProductDesc = dto.ProductDesc,
                    ProductPrice = dto.ProductPrice,
                    ImageUrl = dto.ImageUrl,
                    CategoryId = dto.CategoryId
                };

                _product.AddProduct(product);
                return CreatedAtAction(nameof(GetProductById), new { id = product.ProductId }, product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Only Admins can update products
  
        [HttpPut("UpdateProduct/{id}")]
        public IActionResult UpdateProduct(int id, [FromBody] ProductDto dto)
        {
            if (dto == null)
                return BadRequest("Product data is required.");

            try
            {
                var existingProduct = _product.GetProductById(id);
                if (existingProduct == null)
                    return NotFound($"Product with ID {id} not found.");

                existingProduct.ProductName = dto.ProductName;
                existingProduct.ProductDesc = dto.ProductDesc;
                existingProduct.ProductPrice = dto.ProductPrice;
                existingProduct.ImageUrl = dto.ImageUrl;
                existingProduct.CategoryId = dto.CategoryId;

                _product.UpdateProduct(id, existingProduct);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Only Admins can delete products
      
        [HttpDelete("DeleteProduct/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                var product = _product.GetProductById(id);
                if (product == null)
                    return NotFound($"Product with ID {id} not found.");

                _product.DeleteProduct(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Public: Anyone can view all products
        [AllowAnonymous]
        [HttpGet("getAllProducts")]
        public IActionResult GetAllProducts()
        {
            try
            {
                var products = _product.GetAllProducts();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Public: Anyone can view single product by ID
        [AllowAnonymous]
        [HttpGet("product/{id}")]
        public IActionResult GetProductById(int id)
        {
            try
            {
                var product = _product.GetProductById(id);
                if (product == null)
                    return NotFound($"Product with ID {id} not found.");

                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Public: Anyone can view products by category
        [AllowAnonymous]
        [HttpGet("category/{categoryId}")]
        public IActionResult GetProductsByCategory(int categoryId)
        {
            try
            {
                var products = _product.GetProductsByCategory(categoryId);
                if (products == null || !products.Any())
                    return NotFound($"No products found for category ID {categoryId}.");

                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Public: Anyone can search products
        [AllowAnonymous]
        [HttpGet("search/{name}")]
        public IActionResult SearchProductsByName(string name)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(name))
                    return BadRequest("Search term cannot be empty.");

                var products = _product.SearchProductsByName(name);
                if (products == null || !products.Any())
                    return NotFound($"No products found matching the name '{name}'.");

                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Public: Anyone can filter products by price
        [AllowAnonymous]
        [HttpGet("filter")]
        public IActionResult FilterProductsByPrice([FromQuery] decimal minPrice, [FromQuery] decimal maxPrice)
        {
            try
            {
                if (minPrice < 0 || maxPrice < 0 || minPrice > maxPrice)
                    return BadRequest("Invalid price range.");

                if (minPrice == 0 && maxPrice == 0)
                    return BadRequest("At least one of minPrice or maxPrice must be greater than zero.");

                var products = _product.FilterProductsByPrice(minPrice, maxPrice);
                if (products == null || !products.Any())
                    return NotFound($"No products found in the price range {minPrice} - {maxPrice}.");

                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
