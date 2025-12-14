namespace backend_api.DTOs
{
    public class SignUpRequest
    {
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Email { get; set; } = "";
        public string CompanyName { get; set; } = "";
        public string Password { get; set; } = "";
    }
}
