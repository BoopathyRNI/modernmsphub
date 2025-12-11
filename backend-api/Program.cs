using backend_api;
using backend_api.Data;
using Microsoft.EntityFrameworkCore;
namespace backend_api
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            await ExecuteStartup<Startup>(args);
        }

        private static async Task ExecuteStartup<T>(string[] args) where T : class
        {
            var webhost = CreateHostBuilder<T>(args).Build();

            // Run DB initialization only for the main Startup
            if (typeof(T) == typeof(Startup))
            {
                await InitializeDatabaseAsync(webhost);
            }

            await webhost.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder<T>(string[] args) where T : class =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((_, config) =>
                {
                    // Optional – only include if you have KeyVault config extension
                    //config.AddKeyVaultConfiguration();
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<T>();
                });

        private static async Task InitializeDatabaseAsync(IHost webhost)
        {
            using var scope = webhost.Services.CreateScope();

            var services = scope.ServiceProvider;
            var logger = services.GetRequiredService<ILogger<Program>>();

            try
            {
                logger.LogInformation("DB Initialization Started at: {time}", DateTime.UtcNow);

                var db = services.GetRequiredService<AppDbContext>();
                db.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

                // Optional delete behavior
                var config = services.GetRequiredService<IConfiguration>();
                var ensureDelete = config.GetValue<bool>("Database:EnsureDeletedOnStartup");

                if (ensureDelete)
                {
                    await db.Database.EnsureDeletedAsync();
                }

                await db.Database.EnsureCreatedAsync();

                logger.LogInformation("DB Initialization Completed at: {time}", DateTime.UtcNow);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Database initialization failed!");
                throw;
            }
        }
    }
}
