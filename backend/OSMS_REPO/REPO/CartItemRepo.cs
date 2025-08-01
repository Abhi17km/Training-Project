using Microsoft.EntityFrameworkCore;
using OSMS_DAL.Models;
using OSMS_Repo.REPO;
using OSMS_REPO.REPO;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OSMS_REPO.REPO
{
    public class CartItemRepo : ICartItem
    {
        private readonly OsmsDbContext _context;

        public CartItemRepo(OsmsDbContext context)
        {
            _context = context;
        }




        public void AddToCart(CartItemDto cartItem)
        {
            if (cartItem == null)
                throw new ArgumentNullException(nameof(cartItem));

            if (cartItem.Quantity <= 0)
                throw new ArgumentException("Quantity must be greater than zero", nameof(cartItem.Quantity));

          

            var existingItem = _context.CartItems
                .FirstOrDefault(c => c.UserId == cartItem.UserId && c.ProductId == cartItem.ProductId);

            if (existingItem != null)
            {
                // Item already in cart, update quantity
                existingItem.Quantity += cartItem.Quantity;
                _context.CartItems.Update(existingItem);
            }
            else
            {
               
                _context.CartItems.Add(cartItem);
            }

            _context.SaveChanges();
        }





        public void UpdateCartItem(int cartItemId, int quantity)
        {
            var existingItem = _context.CartItems.Find(cartItemId);
            if (existingItem == null)
                throw new KeyNotFoundException("Cart item not found");
            if (quantity <= 0)
                throw new ArgumentException("Quantity must be greater than zero", nameof(quantity));
            // Update the quantity of the existing cart item

            existingItem.Quantity = quantity;

            _context.CartItems.Update(existingItem);
            // Save changes to the database
            _context.SaveChanges();
        }

        public void RemoveCartItem(int cartItemId)
        {
            var item = _context.CartItems.Find(cartItemId);
            if (item == null)
                throw new KeyNotFoundException("Cart item not found");

          

            // Remove the cart item from the database
            if (item.Quantity > 1)
            {
                // If the item has more than one quantity, just reduce the quantity
                item.Quantity--;
                _context.CartItems.Update(item);
            }
            else
            {
                // If the item has only one quantity, remove it from the cart
                _context.CartItems.Remove(item);
            }

            _context.SaveChanges();

        }

        public void ClearCart(int userId)
        {
            // Clear all items in the user's cart
            if (userId <= 0)
                throw new ArgumentException("Invalid user ID", nameof(userId));
            if (!_context.CartItems.Any(c => c.UserId == userId))
                throw new KeyNotFoundException("No cart items found for the specified user");
            // Find all cart items for the user and remove them

            var items = _context.CartItems.Where(c => c.UserId == userId).ToList();

            _context.CartItems.RemoveRange(items);
            _context.SaveChanges();
        }

        public IEnumerable<CartItemDto> GetCartItemsByUser(int userId)
        {
            if (userId <= 0)
                throw new ArgumentException("Invalid user ID", nameof(userId));


            return _context.CartItems
                    .Include(c => c.Product)  // 👈 this is the fix
                    .Where(c => c.UserId == userId)
                    .ToList();
        }

        public CartItemDto GetCartItemById(int cartItemId)
        {
            if (cartItemId <= 0)
                throw new ArgumentException("Invalid cart item ID", nameof(cartItemId));

            var item = _context.CartItems
                .Include(c => c.Product)
                .FirstOrDefault(c => c.CartId == cartItemId);

            if (item == null)
                throw new KeyNotFoundException($"Cart item with ID {cartItemId} not found.");

            return item;


        }
    }
}