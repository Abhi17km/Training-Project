using OSMS_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSMS_REPO.REPO
{
    public interface ICartItem
    {
        //Cart Item Management (CRUD)
        //Cart Item Management (CRUD)
        void AddToCart(CartItemDto cartItem);                       // Add product to cart
        void UpdateCartItem(int cartItemId, int quantity);       // Update quantity in cart
        void RemoveCartItem(int cartItemId);                     // Remove an item from cart
        void ClearCart(int userId);                               // Clear all items in user's cart

        //Cart Retrieval
        IEnumerable<CartItemDto> GetCartItemsByUser(int userId);    // Get all cart items for a user
        CartItemDto GetCartItemById(int cartItemId);
    }
}
