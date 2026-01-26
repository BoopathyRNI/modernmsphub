using backend_api.DTOs;
using backend_api.Models;
using backend_api.Repositories;
using backend_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly IJobRepository _repo;
        private readonly IJobSimulator _simulator;
        private readonly IHostApplicationLifetime _lifetime;

        public JobsController(IJobRepository repo, IJobSimulator simulator, IHostApplicationLifetime lifetime)
        {
            _repo = repo;
            _simulator = simulator;
            _lifetime = lifetime;
        }

        [HttpPost("start")]
        public async Task<ActionResult<StartJobResponse>> Start([FromBody] StartJobRequest request, CancellationToken ct)
        {
            var job = new Job
            {
                Id = Guid.NewGuid(),
                Type = request.Type,
                Status = JobStatus.Queued,
                Progress = 0,
                Message = request.Message ?? "Job initiated.",
                CreatedAt = DateTimeOffset.UtcNow
            };

            await _repo.CreateAsync(job, ct);

            // DO NOT AWAIT
            _ = _simulator.StartAsync(
                job,
                durationSeconds: request.DurationSeconds,
                shouldFail: request.ShouldFail,
                appStopping: _lifetime.ApplicationStopping
            );

            return Ok(new StartJobResponse
            {
                JobId = job.Id,
                Status = job.Status,
                Message = job.Message
            });
        }


        [HttpGet("{jobId:guid}")]
        public async Task<ActionResult<JobStatusResponse>> Get(Guid jobId, CancellationToken ct)
        {
            var job = await _repo.GetAsync(jobId, ct);
            if (job == null) return NotFound();

            return Ok(new JobStatusResponse
            {
                JobId = job.Id,
                Status = job.Status,
                Progress = job.Progress,
                Message = job.Message,
                Error = job.Error
            });
        }
    }
}
