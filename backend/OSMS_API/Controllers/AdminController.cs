using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OSMS_API.Models;
using OSMS_DAL.Models;
using OSMS_REPO.REPO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OSMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdmin _adminRepo;
        private readonly JwtOption _jwtOptions;

        public AdminController(IAdmin admin, JwtOption options)
        {
            _adminRepo= admin?? throw new ArgumentNullException(nameof(admin));
            _jwtOptions = options??throw new ArgumentNullException(nameof(options));
        }
        // POST: api/Admin/register
        //[HttpPost("register")]
        //public IActionResult Register([FromBody] Admin admin)
        //{
        //    try
        //    {
        //        _adminRepo.AdminRegister(admin);
        //        return Ok("Admin registered successfully.");
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest($"Error: {ex.Message}");
        //    }
        //}

        // POST: api/Admin/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] AdminLoginDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest("Email and password are required.");

            var loggedInAdmin = _adminRepo.AdminLogin(dto.Email, dto.Password);
            if (loggedInAdmin == null)
                return Unauthorized("Invalid email or password.");

            var token = GenerateJwtToken(dto.Email, "admin");
            return Ok(new { token });
        }

        private string GenerateJwtToken(string email, string role)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
      {
          new Claim("Email", email),
          new Claim(ClaimTypes.Role, role)
      };

            var token = new JwtSecurityToken(
                issuer: _jwtOptions.Issuer,
                audience: _jwtOptions.Issuer,
                claims: claims,
                expires: DateTime.Now.AddHours(5),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // PUT: api/Admin/changepassword/5
        [Authorize(Roles = "admin")]
        [HttpPut("changepassword/{adminId}")]
        public IActionResult ChangePassword(int adminId, [FromBody] string newPassword)
        {
            try
            {
                _adminRepo.ChangeAdminPassword(adminId, newPassword);
                return Ok("Password changed successfully.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        // PUT: api/Admin/updateprofile/5
        [Authorize(Roles = "admin")]
        [HttpPut("updateprofile/{adminId}")]
        public IActionResult UpdateProfile(int adminId, [FromBody] Admin admin)
        {
            try
            {
                _adminRepo.UpdateAdminProfile(adminId, admin);
                return Ok("Admin profile updated successfully.");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

    }
}
