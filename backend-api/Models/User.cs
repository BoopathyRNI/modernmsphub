namespace backend_api.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Email { get; set; } = "";
        public string PasswordHash { get; set; } = "";
        public Guid CompanyId { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    }

}
