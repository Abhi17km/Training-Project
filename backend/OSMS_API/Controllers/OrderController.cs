using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OSMS_DAL.Models;
using OSMS_Repo.REPO;
using OSMS_REPO.REPO;
using System.Security.Claims;

namespace OSMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrder _order;

        public OrderController(IOrder order)
        {
            _order = order;
        }

        [Authorize(Roles = "customer")]
        [HttpPost("placeorder")]
        public IActionResult PlaceOrder([FromBody] Order order)
        {
            if (order == null)
                return BadRequest("Order data is required.");

            try
            {
                // Inject UserId from JWT claim
                order.UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

                _order.PlaceOrder(order);
                return Ok("Order placed successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [Authorize(Roles = "user,admin")]
        [HttpGet("getorder/{orderId}")]
        public IActionResult GetOrderById(int orderId)
        {
            if (orderId <= 0)
                return BadRequest("Invalid order ID.");

            try
            {
                var order = _order.GetOrderById(orderId);

                // Customer can only see their own order
                var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

                if (userRole == "customer" && order.UserId != userId)
                    return Forbid("You are not allowed to view this order.");

                return Ok(order);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [Authorize(Roles = "user")]
        [HttpGet("getordersbycustomer")]
        public IActionResult GetOrdersByCustomer()
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                var orders = _order.GetOrdersByCustomer(userId);
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        //[Authorize(Roles = "admin")]
        [HttpGet("getallorders")]
        public IActionResult GetAllOrders()
        {
            try
            {
                var orders = _order.GetAllOrders();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        //[Authorize(Roles = "admin")]
        [HttpPut("updateorderstatus")]
        public IActionResult PutOrder([FromBody] Order order)
        {
            if (order == null || order.OrderId <= 0 || string.IsNullOrEmpty(order.DeliveryStatus))
                return BadRequest("Invalid order data.");

            try
            {
                _order.UpdateOrderStatus(order.OrderId, order.DeliveryStatus);
                return Ok("Order status updated successfully.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

      
        [HttpDelete("deleteorder/{orderId}")]
        public IActionResult DeleteOrder(int orderId)
        {
            if (orderId <= 0)
                return BadRequest("Invalid order ID.");

            try
            {
                _order.DeleteOrder(orderId);
                return Ok(new {message = "Order deleted successfully." });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

       
        [HttpGet("getordercount")]
        public IActionResult GetOrderCount()
        {
            try
            {
                var count = _order.GetAllOrders().Count();
                return Ok(new { OrderCount = count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
