using backend_api.Models;

namespace backend_api.DTOs
{
    public class StartJobRequest
    {
        public string Type { get; set; } = "ProfileCreation";

        // total “work time” simulation
        public int DurationSeconds { get; set; } = 10;

        // if true → it will fail at the end
        public bool ShouldFail { get; set; } = false;

        public string? Message { get; set; }
    }
    public class StartJobResponse
    {
        public Guid JobId { get; set; }
        public JobStatus Status { get; set; }
        public string Message { get; set; } = "";
    }
    public class JobStatusResponse
    {
        public Guid JobId { get; set; }
        public JobStatus Status { get; set; }
        public int Progress { get; set; }
        public string Message { get; set; } = "";
        public string? Error { get; set; }
    }
    public class JobUpdateDto
    {
        public Guid JobId { get; set; }
        public JobStatus Status { get; set; }
        public int Progress { get; set; }
        public string Message { get; set; } = "";
        public string? Error { get; set; }
    }
}
