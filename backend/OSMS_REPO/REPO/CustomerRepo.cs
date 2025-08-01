using MailKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Caching.Memory;
using MimeKit;
using Org.BouncyCastle.Crypto.Macs;
using OSMS_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace OSMS_REPO.REPO
{
    public class CustomerRepo : ICustomer
    {
            private readonly OsmsDbContext _context;
            private readonly IMemoryCache _cache;
        public CustomerRepo(OsmsDbContext context,IMemoryCache memoryCache)
            {
                _context = context;
            _cache = memoryCache;
            }


        public Customer CustomerLogin(string email, string password)
        {
            return _context.Customers.FirstOrDefault(c => c.Email == email && c.Password == password);
        }

        public void CustomerRegister(Customer customer)
        {
            if (_context.Customers.Any(c => c.Username == customer.Username || c.Email == customer.Email))
            {
                throw new InvalidOperationException("Username or Email already exists.");
            }

            if (customer == null) throw new ArgumentNullException(nameof(customer));
            _context.Customers.Add(customer);
            _context.SaveChanges();
        }

        public Customer GetCustomerById(int customerId)
        {
            Customer customer;
            customer = _context.Customers.FirstOrDefault(c => c.UserId == customerId);
            if (customer == null)
            {
                throw new KeyNotFoundException($"Customer with ID {customerId} not found.");
            }
            return customer;

        }

        public void UpdateCustomerProfile(int customerId,Customer customer)
        {
            if (customer == null) throw new ArgumentNullException(nameof(customer));
            var existingCustomer = _context.Customers.FirstOrDefault(c => c.UserId == customerId);
            if (existingCustomer == null)
            {
                throw new KeyNotFoundException($"Customer with ID {customerId} not found.");
            }
            if (!string.IsNullOrWhiteSpace(customer.Username)&&customer.Username != "string")
            {
                existingCustomer.Username = customer.Username;
            }

            if (!string.IsNullOrWhiteSpace(customer.Email) && customer.Email!= "string")
            {
                existingCustomer.Email = customer.Email;
            }

            if (!string.IsNullOrWhiteSpace(customer.Phone) && customer.Phone != "string")
            {
                existingCustomer.Phone = customer.Phone;
            }
            // Update other fields as necessary
            _context.SaveChanges();



        }
        public bool ChangeCustomerPassword(string emailId, string newPassword)
        {
            
            Customer customer = _context.Customers.FirstOrDefault(c => c.Email == emailId);
            if (customer == null)
            {
                throw new KeyNotFoundException($"Customer with ID {emailId} not found.");
            }
            if (string.IsNullOrWhiteSpace(newPassword))
            {
                throw new ArgumentException("New password cannot be empty.", nameof(newPassword));
            }
            customer.Password = newPassword;
            _context.SaveChanges();
            return true;
            
           

        }

       

        private  string generateotp()
        {
            var random=new Random();
            return random.Next(1000, 9999).ToString();


        }
        public bool checkotp(string email,string enteredotp)
        {
            if (_cache.TryGetValue($"OTP_{email}", out string cachedOtp))
            {
                if (cachedOtp == enteredotp)
                {
                    _cache.Remove($"OTP_{email}");
                    return true;

                }
                

            }
            return false;

        }

            //public bool VerifyOtpAndResetPassword(string email, string enteredotp, string newPassword)
            //{
            //    if (_cache.TryGetValue($"OTP_{email}", out string cachedOtp))
            //    {
            //        if (cachedOtp == enteredotp)
            //        {
            //            Console.WriteLine(enteredotp + " " + cachedOtp);
            //            _cache.Remove($"OTP_{email}"); // Optional: remove after success

            //            Customer customer = _context.Customers.FirstOrDefault(c => c.Email == email);
            //            if (customer == null&&string.IsNullOrWhiteSpace(newPassword))
            //            {
            //                throw new KeyNotFoundException($"Customer  not found.");
            //            }
            //            customer.Password = newPassword;
            //            _context.SaveChanges();

            //            return true;
            //        }
            //    }
            //    return false;
            //}

        public string send_mail(string email)
        {
            MimeMessage message = new MimeMessage();
            message.From.Add(new MailboxAddress("mailbot", "mailbot113@gmail.com"));
            message.To.Add(MailboxAddress.Parse(email));
            message.Subject = "Your OTP CODE is";
            string otp = generateotp();
            
            _cache.Set($"OTP_{email}", otp, TimeSpan.FromMinutes(10));
            message.Body = new TextPart("plain")
            {
                Text = $"Your OTP code is: {otp}\n\nThis code is valid for 10 minutes."
            };
            SmtpClient smtpClient = new SmtpClient();
            try
            {
                smtpClient.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                smtpClient.Authenticate("mailbot113@gmail.com", "kjwd khmc agca ccqo");
                smtpClient.Send(message);
                smtpClient.Disconnect(true);

            }
            catch (Exception ex)
            {
                throw new ApplicationException("Failed to send OTP email", ex);
            }
            return otp;

        }
    }
}
