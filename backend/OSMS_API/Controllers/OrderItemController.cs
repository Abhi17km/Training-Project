using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OSMS_API.Models;
using OSMS_DAL.Models;

using OSMS_REPO.REPO;
using OSMS_REPO.Repositories;

namespace OSMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
     // Default: only Admin can access
    public class OrderItemController : ControllerBase
    {
        private readonly IOrderItems _orderItemRepo;

        public OrderItemController(IOrderItems orderItemRepo)
        {
            _orderItemRepo = orderItemRepo;
        }

        [HttpPost("addOrderItem")]
        public IActionResult AddOrderItem([FromBody] OrderItemDto dto)
        {
            if (dto == null || dto.Quantity <= 0 || dto.Price <= 0)
                return BadRequest("Invalid order item data");

            var orderItem = new OrderItem
            {
                OrderId = dto.OrderId,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity,
                Price = dto.Price
            };

            _orderItemRepo.AddOrderItem(orderItem);
            return Ok("Order item added successfully");
        }

        [HttpPost("bulkAddOrderItem")]
        public IActionResult AddOrderItems([FromBody] List<OrderItemDto> dtos)
        {
            if (dtos == null || !dtos.Any())
                return BadRequest("Order items list is empty");

            var orderItems = dtos.Select(dto => new OrderItem
            {
                OrderId = dto.OrderId,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity,
                Price = dto.Price
            }).ToList();

            _orderItemRepo.AddOrderItems(orderItems);
            return Ok("Order items added successfully");
        }

        [HttpPut("updateOrderItem/{id}")]
        public IActionResult UpdateOrderItem(int id, [FromBody] OrderItemDto dto)
        {
            if (dto == null || dto.Quantity <= 0 || dto.Price <= 0)
                return BadRequest("Invalid order item data");

            var orderItem = new OrderItem
            {
                OrderId = dto.OrderId,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity,
                Price = dto.Price
            };

            try
            {
                _orderItemRepo.UpdateOrderItem(id, orderItem);
                return Ok("Order item updated successfully");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("deleteOrderItem/{id}")]
        public IActionResult DeleteOrderItem(int id)
        {
            try
            {
                _orderItemRepo.DeleteOrderItem(id);
                return Ok("Order item deleted successfully");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

       
        [HttpGet("GetOrderItemById/{id}")]
        public IActionResult GetOrderItemById(int id)
        {
            try
            {
                var item = _orderItemRepo.GetOrderItemById(id);
                return Ok(item);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

      
        [HttpGet("GetOrderItemsByOrder/{orderId}")]
        public IActionResult GetOrderItemsByOrder(int orderId)
        {
            var items = _orderItemRepo.GetOrderItemsByOrder(orderId);
            if (!items.Any())
                return NotFound($"No order items found for Order ID {orderId}");

            return Ok(items);
        }
       
        [HttpGet("Getorderitembyuser/{userId}")]
        public ActionResult<IEnumerable<Orderitemdto>> GetOrderItemsByUser(int userId)
        {
            try
            {
                var items = _orderItemRepo.GetOrderItemsByUser(userId);

                if (!items.Any())
                {
                    return NotFound($"No order items found for user with ID {userId}");
                }

                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving data: {ex.Message}");
            }
        }
    }
}
