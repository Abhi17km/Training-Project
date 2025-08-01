using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OSMS_API.Models;
using OSMS_DAL.Models;
using OSMS_REPO.REPO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static System.Net.WebRequestMethods;

namespace OSMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomer _customer;
        private readonly IAdmin _admin;
        private readonly JwtOption _options;

        public CustomersController(ICustomer customer, IOptions<JwtOption> options, IAdmin admin)
        {
            _customer = customer;
            _options = options.Value;
            _admin = admin;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] Customer customer)
        {
            if (customer == null)
                return BadRequest("Customer data is required.");

            try
            {
                _customer.CustomerRegister(customer);
                return Ok(new { message = "User registered successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("login")]
        public IActionResult Login([FromQuery] string role, [FromBody] LoginDto customer)
        {
            if (customer == null || string.IsNullOrEmpty(customer.Email) || string.IsNullOrEmpty(customer.Password))
                return BadRequest("Email and password are required.");

            try
            {
                if (role == "admin")
                {
                    Admin loggedInadmin = _admin.AdminLogin(customer.Email, customer.Password);
                    if (loggedInadmin == null)
                        return Unauthorized("Invalid admin email or password.");

                    var token = GenerateJwtToken(customer.Email);
                    return Ok(new
                    {
                        token = token,
                        user = new
                        {
                            id=loggedInadmin.AdminId,
                            username = loggedInadmin.Username,
                            email = loggedInadmin.Email,
                            password = loggedInadmin.Password
                        }
                    });


                }
                else if (role == "user")
                {
                    Customer loggedInCustomer = _customer.CustomerLogin(customer.Email, customer.Password);
                    if (loggedInCustomer == null)
                        return Unauthorized("Invalid customer email or password.");
                    var token = GenerateJwtToken(customer.Email);
                    return Ok(new
                    {
                        token = token,
                        user = new
                        {
                            id=loggedInCustomer.UserId,
                            username = loggedInCustomer.Username,
                            email = loggedInCustomer.Email,
                            phone = loggedInCustomer.Phone,
                            password=loggedInCustomer.Password
                        }
                    });
                }
                return BadRequest("Invalid role");
                //    Customer loggedInCustomer = _customer.CustomerLogin(customer.Email, customer.Password);
                //if (loggedInCustomer == null)
                //    return Unauthorized("Invalid email or password.");
                
                

                //return Ok(new { message = "User registered successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private string GenerateJwtToken(string email)
        {
            var jwtKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Key));
            var crendential = new SigningCredentials(jwtKey, SecurityAlgorithms.HmacSha256);
            List<Claim> claims = new List<Claim>()
        {
            new Claim("Email",email)
        };
            var sToken = new JwtSecurityToken(_options.Key, _options.Issuer, claims, expires: DateTime.Now.AddHours(5), signingCredentials: crendential);
            var token = new JwtSecurityTokenHandler().WriteToken(sToken);
            return token;
        }

        [HttpGet("getcustomer/{customerId}")]
        [Authorize]
        public IActionResult GetCustomerById(int customerId)
        {
            if (customerId <= 0)
                return BadRequest("Invalid customer ID.");

            try
            {
                var customer = _customer.GetCustomerById(customerId);
                return Ok(customer);
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Customer with ID {customerId} not found.");
            }
        }

        [HttpPut("updateprofile/{customerId}")]
        public IActionResult UpdateCustomerProfile(int customerId, [FromBody] UpdateCustomerDto customer)
        {
            if (customer == null)
                return BadRequest("Customer data is required.");

            if (customerId <= 0)
                return BadRequest("Invalid customer ID.");

            try
            {
                var item = new Customer {
                    Username=customer.Username,
                    Email=customer.Email,
                    Phone=customer.Phone
                };

                _customer.UpdateCustomerProfile(customerId, item);
                return Ok(new { message = " Profile updated successfully" });
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Customer with ID {customerId} not found.");
            }
        }
        [HttpPost("otpcheck")]
        public IActionResult OtpCheck([FromBody] OtpResetRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Otp))
            {
                return BadRequest("Email, OTP,  are required.");
            }
            if (_customer.checkotp(request.Email, request.Otp))
            {
                return Ok(new { message = "otp has been verified successfully." });

            }
            return BadRequest("otp is not verified");

        }

        [HttpPost("reset-password")]


        public IActionResult ResetPassword([FromBody] ResetPasswordRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || (string.IsNullOrWhiteSpace(request.NewPassword)))
            {
                return BadRequest("Email or password  required");
            }

            var success = _customer.ChangeCustomerPassword(request.Email, request.NewPassword);
            if (success)
            {
                return Ok(new { message = "Password has been reset successfully" });
            }

            return BadRequest("password not set.");
        }

        [HttpPost("verify-otp")]
        public IActionResult VerifyOtp([FromQuery] string email)
        {
            if (email == null)
            {
                return BadRequest("Email id is null");
            }
            try
            {
                string otp = _customer.send_mail(email);
                return Ok(new { message = "Email sent successfully", otp });

            }
            catch (Exception ex)
            {
                return NotFound(new { error = $"Email ID {email} not found." });

            }

        }

        //    [HttpPut("changepassword/{customerId}")]
        //    public IActionResult ChangeCustomerPassword(int customerId, [FromBody] string newPassword)
        //    {
        //        if (string.IsNullOrWhiteSpace(newPassword))
        //            return BadRequest("New password is required.");

        //        if (customerId <= 0)
        //            return BadRequest("Invalid customer ID.");

        //        try
        //        {
        //            _customer.ChangeCustomerPassword(customerId, newPassword);
        //            return Ok("Password changed successfully.");
        //        }
        //        catch (KeyNotFoundException)
        //        {
        //            return NotFound($"Customer with ID {customerId} not found.");
        //        }
        //    }
        //}
    }
}
