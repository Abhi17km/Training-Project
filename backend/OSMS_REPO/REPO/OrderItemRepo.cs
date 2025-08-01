using Microsoft.EntityFrameworkCore;
using OSMS_API.Models;
using OSMS_DAL.Models;
using OSMS_Repo.REPO;
using OSMS_REPO.REPO;
using System;
using System.Collections.Generic;
using System.Linq;


namespace OSMS_REPO.Repositories
{
    public class OrderItemRepo : IOrderItems
    {
        private readonly OsmsDbContext _context;

        public OrderItemRepo(OsmsDbContext context)
        {
            _context = context;
        }

        public void AddOrderItem(OrderItem orderItem)
        {
            if (orderItem == null)
                throw new ArgumentNullException(nameof(orderItem), "OrderItem cannot be null");
            if (orderItem.Quantity <= 0)
                throw new ArgumentException("OrderItem quantity must be greater than zero", nameof(orderItem.Quantity));
            if (orderItem.Price <= 0)
                throw new ArgumentException("OrderItem price must be greater than zero", nameof(orderItem.Price));

            _context.OrderItems.Add(orderItem);
            _context.SaveChanges();
        }

        public void AddOrderItems(IEnumerable<OrderItem> orderItems)
        {
            if (orderItems == null || !orderItems.Any())
                throw new ArgumentException("OrderItems list is null or empty", nameof(orderItems));
         
             
            _context.OrderItems.AddRange(orderItems);
            _context.SaveChanges();
        }

        public void UpdateOrderItem(int orderItemId, OrderItem orderItem)
        {
            var existingItem = _context.OrderItems.Find(orderItemId);
            if (existingItem == null)
                throw new KeyNotFoundException($"OrderItem with ID {orderItemId} not found");

            existingItem.ProductId = orderItem.ProductId;
            existingItem.OrderId = orderItem.OrderId;
            existingItem.Quantity = orderItem.Quantity;
            existingItem.Price = orderItem.Price;

            _context.OrderItems.Update(existingItem);
            _context.SaveChanges();
        }

        public void DeleteOrderItem(int orderItemId)
        {
            var orderItem = _context.OrderItems.Find(orderItemId);
            if (orderItem == null)
                throw new KeyNotFoundException($"OrderItem with ID {orderItemId} not found");

            _context.OrderItems.Remove(orderItem);
            _context.SaveChanges();
        }
        public IEnumerable<Orderitemdto> GetOrderItemsByUser(int userId)
        {
            return _context.OrderItems
         .Where(oi => oi.Order.UserId == userId)
         .Include(oi => oi.Product)
         .Include(oi => oi.Order)
         .Select(oi => new Orderitemdto
         {
             OrderId = oi.OrderId,
             ProductId = oi.ProductId,
             Quantity = oi.Quantity,
             Price = oi.Price,
             ProductName = oi.Product.ProductName,
             DeliveryStatus = oi.Order.DeliveryStatus
         })
         .ToList();
        }


        public OrderItem GetOrderItemById(int orderItemId)
        {
            var orderItem = _context.OrderItems.Find(orderItemId);
            if (orderItem == null)
                throw new KeyNotFoundException($"OrderItem with ID {orderItemId} not found");

            return orderItem;
        }

        public IEnumerable<OrderItem> GetOrderItemsByOrder(int orderId)
        {
            return _context.OrderItems.Where(oi => oi.OrderId == orderId).ToList();
        }

        //IEnumerable<OrderItem> IOrderItems.GetOrderItemsByUser(int userId)
        //{
        //    throw new NotImplementedException();
        //}
    }
}