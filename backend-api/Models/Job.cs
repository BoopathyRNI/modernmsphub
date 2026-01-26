using System.ComponentModel.DataAnnotations;

namespace backend_api.Models
{
    public class Job
    {
        [Key]
        public Guid Id { get; set; }

        [MaxLength(100)]
        public string Type { get; set; } = "POC";

        public JobStatus Status { get; set; } = JobStatus.Queued;

        public int Progress { get; set; } = 0;

        [MaxLength(500)]
        public string Message { get; set; } = "Job initiated.";

        public string? Error { get; set; }

        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset? StartedAt { get; set; }
        public DateTimeOffset? FinishedAt { get; set; }
    }

    public enum JobStatus
    {
        Queued = 0,
        Running = 1,
        Succeeded = 2,
        Failed = 3
    }

}
