using OSMS_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSMS_REPO.REPO
{
    public class AdminRepo:IAdmin
    {
        private readonly OsmsDbContext _context;
        public AdminRepo(OsmsDbContext context)
        {
            _context = context;
        }
        public Admin AdminLogin(string email, string password)
        {
            return _context.Admins.FirstOrDefault(c => c.Email == email && c.Password == password);
        }

        public void ChangeAdminPassword(int adminId, string newPassword)
        {
            throw new NotImplementedException();
        }

        public Admin GetAdminById(int adminId)
        {
            throw new NotImplementedException();
        }

        public void UpdateAdminProfile(int adminId, Admin admin)
        {
            throw new NotImplementedException();
        }
    }
}
