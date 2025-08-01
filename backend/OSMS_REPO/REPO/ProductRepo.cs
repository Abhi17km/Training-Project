using Microsoft.EntityFrameworkCore;
using OSMS_DAL.Models;
using OSMS_Repo.REPO;
using OSMS_REPO.REPO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSMS_REPO.Repositories
{
    public class ProductRepo : IProduct
    {
        private readonly OsmsDbContext _context;
        public ProductRepo(OsmsDbContext context)
        {
            _context = context;
        }

        public void AddProduct(Product product)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product), "Product cannot be null");
            }
            if (string.IsNullOrWhiteSpace(product.ProductName) || product.ProductPrice <= 0 || product.CategoryId <= 0)
            {
                throw new ArgumentException("Product details are incomplete or invalid");
            }
            _context.Products.Add(product);
            _context.SaveChanges();
        }

        public void DeleteProduct(int productId)
        {
            var product = _context.Products.Find(productId);
            if (product == null)
            {
                throw new KeyNotFoundException($"Product with ID {productId} not found");
            }
            _context.Products.Remove(product);
            _context.SaveChanges();
        }

        public IEnumerable<Product> FilterProductsByPrice(decimal minPrice, decimal maxPrice)
        {
            if (minPrice < 0 || maxPrice < 0 || minPrice > maxPrice)
            {
                throw new ArgumentException("Invalid price range");
            }

            return _context.Products.Where(p => p.ProductPrice >= minPrice && p.ProductPrice <= maxPrice).ToList();

        }

        public IEnumerable<Product> GetAllProducts()
        {
            if (_context.Products == null || !_context.Products.Any())
            {
                throw new InvalidOperationException("No products available");
            }
            return _context.Products.ToList();
        }

        public Product GetProductById(int productId)
        {
            if (productId <= 0)
            {
                throw new ArgumentException("Product ID must be greater than zero", nameof(productId));
            }
            var product = _context.Products.Find(productId);

            if (product == null)
            {
                throw new KeyNotFoundException($"Product with ID {productId} not found");
            }
            return product;
        }

        public IEnumerable<Product> GetProductsByCategory(int categoryId)
        {
            if (categoryId <= 0)
            {
                throw new ArgumentException("Category ID must be greater than zero", nameof(categoryId));
            }
            var products = _context.Products.Where(p => p.CategoryId == categoryId).ToList();
            if (products == null || !products.Any())
            {
                throw new InvalidOperationException($"No products found for category ID {categoryId}");
            }
            if (products.Count == 0)
            {
                throw new InvalidOperationException($"No products found for category ID {categoryId}");
            }

            return products;
        }

        public IEnumerable<Product> SearchProductsByName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Search term cannot be null or empty", nameof(name));
            }

            var products = _context.Products
                .Where(p => EF.Functions.Like(p.ProductName, $"%{name}%"))
                .ToList();

            if (products == null || !products.Any())
            {
                throw new InvalidOperationException($"No products found matching the name '{name}'");
            }

            return products;
        }


        public void UpdateProduct(int productId, Product product)
        {
            if (productId <= 0)
            {
                throw new ArgumentException("Product ID must be greater than zero", nameof(productId));

            }
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product), "Product cannot be null");
            }
            if (string.IsNullOrWhiteSpace(product.ProductName) || product.ProductPrice <= 0 || product.CategoryId <= 0)
            {
                throw new ArgumentException("Product details are incomplete or invalid");
            }
            var existingProduct = _context.Products.Find(productId);
            if (existingProduct != null)
            {
                existingProduct.ProductId = product.ProductId;
                existingProduct.ProductName = product.ProductName;
                existingProduct.ProductDesc = product.ProductDesc;
                existingProduct.ProductPrice = product.ProductPrice;
                existingProduct.CategoryId = product.CategoryId;
                existingProduct.ImageUrl = product.ImageUrl;

                _context.Products.Update(existingProduct);
                _context.SaveChanges();
            }
            else
            {
                throw new KeyNotFoundException($"Product with ID {productId} not found");
            }

        }
    }
}