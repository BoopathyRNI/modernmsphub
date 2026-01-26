using backend_api.DTOs;
using backend_api.Models;
using backend_api.Repositories;
using Microsoft.AspNetCore.SignalR;

namespace backend_api.Services
{
    public interface IJobSimulator
    {
        Task StartAsync(
            Job job,
            int durationSeconds,
            bool shouldFail,
            CancellationToken appStopping);
    }

    public class JobSimulator : IJobSimulator
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly IHubContext<JobHub> _hub;
        private readonly ILogger<JobSimulator> _logger;

        public JobSimulator(
            IServiceScopeFactory scopeFactory,
            IHubContext<JobHub> hub,
            ILogger<JobSimulator> logger)
        {
            _scopeFactory = scopeFactory;
            _hub = hub;
            _logger = logger;
        }

        public async Task StartAsync(
            Job job,
            int durationSeconds,
            bool shouldFail,
            CancellationToken appStopping)
        {
            try
            {
                using var scope = _scopeFactory.CreateScope();
                var repo = scope.ServiceProvider.GetRequiredService<IJobRepository>();

                // QUEUED → RUNNING
                await Task.Delay(2000, appStopping);

                job.Status = JobStatus.Running;
                job.StartedAt = DateTimeOffset.UtcNow;
                job.Progress = 5;
                job.Message = "Job running...";
                await repo.UpdateAsync(job, appStopping);
                await Publish(job);

                var total = Math.Max(3, durationSeconds);

                for (int i = 1; i <= total; i++)
                {
                    await Task.Delay(2000, appStopping);

                    job.Progress = Math.Min(99, i * 100 / total);
                    job.Message = $"Processing... ({job.Progress}%)";

                    await repo.UpdateAsync(job, appStopping);
                    await Publish(job);
                }

                job.FinishedAt = DateTimeOffset.UtcNow;

                if (shouldFail)
                {
                    job.Status = JobStatus.Failed;
                    job.Error = "Simulated failure (POC).";
                    job.Message = "Job failed.";
                }
                else
                {
                    job.Status = JobStatus.Succeeded;
                    job.Progress = 100;
                    job.Message = "Job completed successfully.";
                }

                await repo.UpdateAsync(job, appStopping);
                await Publish(job);
            }
            catch (OperationCanceledException)
            {
                _logger.LogWarning("Job cancelled: {JobId}", job.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Background job failed: {JobId}", job.Id);
            }
        }

        private Task Publish(Job job)
        {
            var dto = new JobUpdateDto
            {
                JobId = job.Id,
                Status = job.Status,
                Progress = job.Progress,
                Message = job.Message,
                Error = job.Error
            };

            Console.WriteLine(
                $"📣 JobUpdated SENT | JobId={dto.JobId} | Status={dto.Status} | Progress={dto.Progress}");

            return _hub.Clients.All.SendAsync("JobUpdated", dto);
        }
    }

}
