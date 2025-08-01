using OSMS_DAL.Models;
using OSMS_REPO.REPO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSMS_Repo.Repo
{
    public class OrderRepo : IOrder
    {
        private readonly OsmsDbContext _context;


        public OrderRepo(OsmsDbContext context)
        {
            _context = context;
        }
        public void DeleteOrder(int orderId)
        {
            if (orderId <= 0) throw new ArgumentException("Invalid order ID.");
            Order order = _context.Orders.FirstOrDefault(o => o.OrderId == orderId);
            if (order == null) throw new KeyNotFoundException($"Order with ID {orderId} not found.");
            _context.Orders.Remove(order);
            _context.SaveChanges();
        }

        public IEnumerable<Order> GetAllOrders()
        {
            return _context.Orders.ToList();
        }

        public Order GetOrderById(int orderId)
        {
            if (orderId <= 0) throw new ArgumentException("Invalid order ID.");
            Order order = _context.Orders.FirstOrDefault(o => o.OrderId == orderId);
            if (order == null) throw new KeyNotFoundException($"Order with ID {orderId} not found.");
            return order;
        }

        public IEnumerable<Order> GetOrdersByCustomer(int userId)
        {
            if (userId <= 0) throw new ArgumentException("Invalid user ID.");
            return _context.Orders.Where(o => o.UserId == userId).ToList();
        }
        public void PlaceOrder(Order order)
        {
            if (order == null) throw new ArgumentNullException(nameof(order));
            if (order.UserId <= 0) throw new ArgumentException("Invalid user ID.");
            if (order.OrderItems == null || !order.OrderItems.Any()) throw new ArgumentException("Order must have at least one item.");

            order.CreatedAt = DateTime.Now;
            order.DeliveryStatus = "Pending";
            order.TotalAmount = order.OrderItems.Sum(item => item.Price * item.Quantity);

            // Optional: Prevent circular reference issues
            foreach (var item in order.OrderItems)
            {
                item.Order = null;
            }

            _context.Orders.Add(order);
            _context.SaveChanges();
        }
        public void UpdateOrderStatus(int orderId, string status)
        {
            if (orderId <= 0) throw new ArgumentException("Invalid order ID.");
            if (string.IsNullOrWhiteSpace(status)) throw new ArgumentException("Status cannot be null or empty.");
            Order order = _context.Orders.FirstOrDefault(o => o.OrderId == orderId);
            if (order == null) throw new KeyNotFoundException($"Order with ID {orderId} not found.");
            order.DeliveryStatus = status.Trim();
            _context.SaveChanges();
        }
    }
}


