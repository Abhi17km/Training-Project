using OSMS_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSMS_REPO.REPO
{
    public interface IOrder
    {
        //Order Placement (Customer)
        void PlaceOrder(Order order);                             // Place a new order

        //Order Retrieval
        Order GetOrderById(int orderId);                          // Get order details by ID
        IEnumerable<Order> GetAllOrders();                        // Get all orders (Admin use)
        IEnumerable<Order> GetOrdersByCustomer(int userId);       // Get all orders placed by a specific customer

        //Order Management (Admin)
        void UpdateOrderStatus(int orderId, string status);       // Update delivery status (Pending, Shipped, Delivered, etc.)
        void DeleteOrder(int orderId);
    }
}
