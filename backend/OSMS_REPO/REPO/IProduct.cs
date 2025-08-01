using OSMS_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSMS_REPO.REPO
{
    public interface IProduct
    {
        //Product Management (CRUD)
        void AddProduct(Product product);                       // Add a new product
        void UpdateProduct(int productId, Product product);     // Update existing product
        void DeleteProduct(int productId);                      // Delete a product by ID

        //Product Retrieval
        Product GetProductById(int productId);                  // Get product details by ID
        IEnumerable<Product> GetAllProducts();                  // Get all products
        IEnumerable<Product> GetProductsByCategory(int categoryId); // Get products by category

        //Search & Filter (No StockQuantity Related)
        IEnumerable<Product> SearchProductsByName(string name); // Search products by name
        IEnumerable<Product> FilterProductsByPrice(decimal minPrice, decimal maxPrice); // Filter by price range
    }
}
