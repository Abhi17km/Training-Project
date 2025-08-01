using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OSMS_API.Models;
using OSMS_DAL.Models;
using OSMS_REPO.REPO;

namespace OSMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategory _categoryRepo;
        private readonly ICustomer _customer;
        private readonly IAdmin _admin;

        public CategoryController(ICategory categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        // Admin only: Add a new category
  
        [HttpPost("AddCategory")]
        public IActionResult AddCategory([FromBody] CategoryDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.CategoryName))
                return BadRequest("Category name is required.");

            if (_categoryRepo.GetCategoryByName(dto.CategoryName) != null)
                return Conflict("Category with this name already exists.");

            var category = new Category
            {
                CategoryName = dto.CategoryName
            };

            _categoryRepo.AddCategory(category);
            return Ok(new { message = "Category added successfully." });
        }

        [HttpPut("UpdateCategory/{categoryId}")]
        public IActionResult UpdateCategory(int categoryId, [FromBody] CategoryDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.CategoryName))
                return BadRequest("Category name is required.");

            var existingCategory = _categoryRepo.GetCategoryById(categoryId);
            if (existingCategory == null)
                return NotFound($"Category with ID {categoryId} not found.");

            var duplicateCategory = _categoryRepo.GetCategoryByName(dto.CategoryName);
            if (duplicateCategory != null && duplicateCategory.CategoryId != categoryId)
                return Conflict("Another category with this name already exists.");

            existingCategory.CategoryName = dto.CategoryName;
            _categoryRepo.UpdateCategory(categoryId, existingCategory);

            return Ok("Category updated successfully.");
        }
        // Admin only: Delete a category
    
        [HttpDelete("DeleteCategory/{categoryId}")]
        public IActionResult DeleteCategory(int categoryId)
        {
            var category = _categoryRepo.GetCategoryById(categoryId);
            if (category == null)
                return NotFound($"Category with ID {categoryId} not found.");

            if (category.Products != null && category.Products.Any())
                return Conflict("Cannot delete category with associated products.");

            _categoryRepo.DeleteCategory(categoryId);
            return Ok();
        }

        [Authorize]
        [HttpGet("GetCategoryById/{categoryId}")]
        public IActionResult GetCategoryById(int categoryId)
        {
            if (categoryId <= 0)
                return BadRequest("Invalid category ID.");

            var category = _categoryRepo.GetCategoryById(categoryId);
            if (category == null)
                return NotFound($"Category with ID {categoryId} not found.");

            return Ok(new Category
            {
                CategoryId = category.CategoryId,
                CategoryName = category.CategoryName
            });
        }

        [HttpGet("GetAllCategories")]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryRepo.GetAllCategories();

            var result = categories.Select(c => new CategoryDto
            {
                CategoryId=c.CategoryId,
                CategoryName = c.CategoryName
            });

            return Ok(result);
        }

    }
}
