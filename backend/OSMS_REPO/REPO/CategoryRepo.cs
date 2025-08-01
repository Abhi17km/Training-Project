using Microsoft.EntityFrameworkCore;
using OSMS_DAL.Models;
using OSMS_REPO.REPO;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OSMS_Repo.REPO
{
    public class CategoryRepo : ICategory
    {
        private readonly OsmsDbContext _context;

        public CategoryRepo(OsmsDbContext context)
        {
            _context = context;
        }

        public void AddCategory(Category category)
        {
            if (category == null)
                throw new ArgumentNullException(nameof(category), "Category cannot be null.");

            if (string.IsNullOrWhiteSpace(category.CategoryName))
                throw new ArgumentException("Category name cannot be null or empty.", nameof(category.CategoryName));

            if (_context.Categories.Any(c => c.CategoryName == category.CategoryName))
                throw new InvalidOperationException("Category with this name already exists.");

            _context.Categories.Add(category);
            _context.SaveChanges();
        }

        public void DeleteCategory(int categoryId)
        {
            var category = _context.Categories.FirstOrDefault(c => c.CategoryId == categoryId);
            if (category == null)
                throw new KeyNotFoundException($"Category with ID {categoryId} not found.");

            if (category.Products != null && category.Products.Any())
                throw new InvalidOperationException("Cannot delete category with associated products.");

            _context.Categories.Remove(category);
            _context.SaveChanges();
        }

        public void UpdateCategory(int categoryId, Category category)
        {
            if (category == null)
                throw new ArgumentNullException(nameof(category));

            if (string.IsNullOrWhiteSpace(category.CategoryName))
                throw new ArgumentException("Category name cannot be null or empty.", nameof(category.CategoryName));

            var existingCategory = _context.Categories.FirstOrDefault(c => c.CategoryId == categoryId);
            if (existingCategory == null)
                throw new KeyNotFoundException($"Category with ID {categoryId} not found.");

            if (_context.Categories.Any(c => c.CategoryName == category.CategoryName && c.CategoryId != categoryId))
                throw new InvalidOperationException("Another category with this name already exists.");

            existingCategory.CategoryName = category.CategoryName;
            _context.SaveChanges();
        }

        public Category GetCategoryById(int categoryId)
        {
            if (categoryId <= 0)
                throw new ArgumentOutOfRangeException(nameof(categoryId), "Category ID must be greater than zero.");

            var category = _context.Categories.FirstOrDefault(c => c.CategoryId == categoryId);
            if (category == null)
                throw new KeyNotFoundException($"Category with ID {categoryId} not found.");

            return category;
        }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            var categories = await _context.Categories.ToListAsync();

            if (!categories.Any())
                throw new InvalidOperationException("No categories found.");

            return categories;
        }



        public Category GetCategoryByName(string categoryName)
        {
            if (string.IsNullOrWhiteSpace(categoryName))
                throw new ArgumentException("Category name cannot be null or empty.", nameof(categoryName));

            if (categoryName.Length > 100)
                throw new ArgumentException("Category name cannot exceed 100 characters.", nameof(categoryName));

            // Move to in-memory filtering to support StringComparison
            var category = _context.Categories
                .AsEnumerable()
                .FirstOrDefault(c => c.CategoryName.Equals(categoryName, StringComparison.OrdinalIgnoreCase));

            return category;
        }

    }
}
