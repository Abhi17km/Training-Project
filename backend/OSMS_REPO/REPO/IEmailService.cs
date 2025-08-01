using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OSMS_REPO.REPO
{
    public interface IEmailService
    {
        void SendOtpEmail(string toEmail, string otp);
    }
}
