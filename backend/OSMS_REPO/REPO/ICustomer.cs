using OSMS_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSMS_REPO.REPO
{
    public interface ICustomer
    {
        // Customer Authentication
        //Customer Authentication
        Customer CustomerLogin(string username, string password);
        void CustomerRegister(Customer customer);                   // Register new customer

        //Customer Profile
        Customer GetCustomerById(int customerId);                   // Get customer profile details
        void UpdateCustomerProfile(int customerId, Customer customer); // Update profile
        bool ChangeCustomerPassword(string emailId, string newPassword); // Change password
  
        //bool VerifyOtpAndResetPassword(string email, string otp, string newPassword);
        bool checkotp(string email, string otp);
        string  send_mail(string email);

    }
}
