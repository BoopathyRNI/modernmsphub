using backend_api.Data;
using backend_api.Models;
using Microsoft.EntityFrameworkCore;

namespace backend_api.Repositories
{
    public interface IJobRepository
    {
        Task<Job> CreateAsync(Job job, CancellationToken ct);
        Task<Job?> GetAsync(Guid jobId, CancellationToken ct);
        Task UpdateAsync(Job job, CancellationToken ct);
    }

    public class JobRepository : IJobRepository
    {
        private readonly AppDbContext _db;

        public JobRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<Job> CreateAsync(Job job, CancellationToken ct)
        {
            _db.Jobs.Add(job);
            await _db.SaveChangesAsync(ct);
            return job;
        }

        public Task<Job?> GetAsync(Guid jobId, CancellationToken ct)
            => _db.Jobs.AsNoTracking().FirstOrDefaultAsync(x => x.Id == jobId, ct);

        public async Task UpdateAsync(Job job, CancellationToken ct)
        {
            _db.Jobs.Update(job);
            await _db.SaveChangesAsync(ct);
        }
    }
}
