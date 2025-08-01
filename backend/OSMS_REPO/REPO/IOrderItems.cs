using OSMS_API.Models;
using OSMS_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSMS_REPO.REPO
{
    public interface IOrderItems
    {
        //Order Item Management (CRUD)
        void AddOrderItem(OrderItem orderItem);                         // Add a single order item
        void AddOrderItems(IEnumerable<OrderItem> orderItems);          // Add multiple order items (bulk insert)
        void UpdateOrderItem(int orderItemId, OrderItem orderItem);     // Update order item details
        void DeleteOrderItem(int orderItemId);                          // Delete a specific order item

        //Order Item Retrieval
        OrderItem GetOrderItemById(int orderItemId);
        // Get details of a specific order item
        IEnumerable<Orderitemdto> GetOrderItemsByUser(int userId);

        IEnumerable<OrderItem> GetOrderItemsByOrder(int orderId);
    }
}
