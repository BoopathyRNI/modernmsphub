using backend_api.DTOs;
using backend_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _service;

        public AuthController(IUserService service)
        {
            _service = service;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup(SignUpRequest request)
        {
            var result = await _service.SignupAsync(request);
            if (!result.Success) return BadRequest(result);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var result = await _service.LoginAsync(request);
            if (!result.Success) return Unauthorized(result);
            return Ok(result);
        }
    }
}
