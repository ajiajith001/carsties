using AuctionService.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AuctionDbContext>(options => {
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

app.UseAuthorization();

app.MapControllers();

try {
    DbInitializer.InitDb(app);
} catch (Exception ex) {
    Console.WriteLine($"Error: {ex.Message}");
    throw;
}

app.Run();
