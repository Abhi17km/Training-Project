using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OSMS_API.Models;
using OSMS_DAL.Models;
using OSMS_REPO.REPO;

namespace OSMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemController : ControllerBase
    {
        private readonly ICartItem _cartRepo;
        private readonly OsmsDbContext _context;

        public CartItemController(ICartItem cartRepo, OsmsDbContext context)
        {
            _cartRepo = cartRepo;
            _context = context;
        }

        [HttpPost("addToCart")]
        public IActionResult AddToCart([FromBody] CartItemdto dto)
        {
            if (dto == null )
                return BadRequest("Invalid cart item.");

            if (dto.Quantity <= 0)
                return BadRequest("Invalid cart item quantity"+dto.Quantity);

            var item = new CartItemDto
            {
                ProductId = dto.ProductId,
                Quantity = dto.Quantity,
                UserId = dto.UserId
            };

            _cartRepo.AddToCart(item);
            return Ok(new { message = "Item added to cart" });
        }

        [HttpPut("updateCartItem/{id}")]
        public IActionResult UpdateCartItem(int id, [FromQuery] int quantity)
        {
            try
            {
                _cartRepo.UpdateCartItem(id, quantity);
                return Ok("Cart item updated.");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred", details = ex.Message });
            }

        }

        [HttpDelete("deleteCartItem/{id}")]
        public IActionResult RemoveCartItem(int id)
        {
            _cartRepo.RemoveCartItem(id);
            return Ok("Cart item removed.");
        }

        [HttpDelete("clearCart/{userId}")]
        public IActionResult ClearCart(int userId)
        {
            _cartRepo.ClearCart(userId);
            return Ok("Cart cleared.");
        }

        [HttpGet("GetCartItemsByUser/{userId}")]
        public IActionResult GetCartItemsByUser(int userId)
        {
            var items = _cartRepo.GetCartItemsByUser(userId);

            if (!items.Any())
                return Ok(new List<CartItemResponseDto>()); // or return 204 NoContent if preferred

            var response = items.Select(ci => new CartItemResponseDto
            {
                CartId = ci.CartId,
                ProductId = ci.ProductId,
                Quantity = ci.Quantity,
                ProductName = ci.Product?.ProductName,
                ProductPrice = ci.Product?.ProductPrice ?? 0
            });

            return Ok(response);
        }
        [HttpPost("placeOrder/{userId}")]
        public IActionResult PlaceOrder(int userId)
        {
            var cartItems = _context.CartItems
     .Where(c => c.UserId == userId)
     .Include(c => c.Product) // ✅ Include product info
     .ToList();
            if (!cartItems.Any())
                return BadRequest("Cart is empty.");
            var totalAmount = cartItems.Sum(c => c.Quantity * c.Product.ProductPrice);
            var newOrder = new Order
            {
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                TotalAmount = totalAmount,
                DeliveryStatus = "Order Placed",
                OrderItems = cartItems.Select(c => new OrderItem
                {
                    ProductId = c.ProductId,
                    Quantity = c.Quantity,
                    Price = c.Product.ProductPrice
                }).ToList()
            };
            _context.Orders.Add(newOrder);
            _context.CartItems.RemoveRange(cartItems); // Clear cart after order
            _context.SaveChanges();
            return Ok(new { message = "Order placed successfully", orderId = newOrder.OrderId });
        }


        [HttpGet("GetCartItemById/{id}")]
        public IActionResult GetCartItemById(int id)
        {
            try
            {
                var item = _cartRepo.GetCartItemById(id);

                var response = new CartItemResponseDto
                {
                    CartId = item.CartId,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    ProductName = item.Product?.ProductName,
                    ProductPrice = item.Product?.ProductPrice ?? 0
                };

                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred", details = ex.Message });
            }
        }

    }
}

