using OSMS_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSMS_REPO.REPO
{
    public interface IAdmin
    {
        // 🔑 Admin Authentication
        //Admin Authentication
        //Admin Authentication
        Admin AdminLogin(string username, string password);   // Login admin (JWT issued by Service layer)

        //Admin Profile (Optional)
        Admin GetAdminById(int adminId);                      // Get admin profile details
        void UpdateAdminProfile(int adminId, Admin admin);    // Update admin profile details
        void ChangeAdminPassword(int adminId, string newPassword); // Change password
    }
}
