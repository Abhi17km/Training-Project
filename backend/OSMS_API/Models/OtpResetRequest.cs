namespace OSMS_API.Models
{
    public class OtpResetRequest
    {
        public string Email { get; set; }
        public string Otp { get; set; }
        //public string? NewPassword { get; set; }
    }
}
