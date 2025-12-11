using backend_api.DTOs;
using backend_api.Models;
using backend_api.Repositories;
using System.Security.Cryptography;
using System.Text;

namespace backend_api.Services
{
    public interface IUserService
    {
        Task<SignUpResponse> SignupAsync(SignUpRequest request);
        Task<LoginResponse> LoginAsync(LoginRequest request);
    }
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;

        public UserService(IUserRepository repo)
        {
            _repo = repo;
        }

        public async Task<SignUpResponse> SignupAsync(SignUpRequest request)
        {
            var existing = await _repo.GetByEmailAsync(request.Email);
            if (existing != null)
            {
                return new SignUpResponse
                {
                    Success = false,
                    Message = "Email already exists"
                };
            }

            var user = new User
            {
                Email = request.Email,
                PasswordHash = HashPassword(request.Password)
            };

            await _repo.CreateAsync(user);

            return new SignUpResponse
            {
                Success = true,
                Message = "User created successfully"
            };
        }

        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            var user = await _repo.GetByEmailAsync(request.Email);
            if (user == null)
            {
                return new LoginResponse
                {
                    Success = false,
                    Message = "Invalid email or password"
                };
            }

            if (user.PasswordHash != HashPassword(request.Password))
            {
                return new LoginResponse
                {
                    Success = false,
                    Message = "Invalid email or password"
                };
            }

            return new LoginResponse
            {
                Success = true,
                Message = "Login successful"
            };
        }

        private static string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}
