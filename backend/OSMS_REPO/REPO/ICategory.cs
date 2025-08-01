using OSMS_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSMS_REPO.REPO
{
    public interface ICategory
    {
        //Category Management (CRUD)
        void AddCategory(Category category);                        // Add a new category
        void UpdateCategory(int categoryId, Category category);     // Update existing category
        void DeleteCategory(int categoryId);                        // Delete category by ID

        //Category Retrieval
        Category GetCategoryById(int categoryId);                   // Get category details by ID
        Category GetCategoryByName(string categoryName);             // Get category by name
        Task<IEnumerable<Category>> GetAllCategories();
    }
}
