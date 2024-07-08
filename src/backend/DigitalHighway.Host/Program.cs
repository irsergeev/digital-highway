using DigitalHighway.Core;
using DigitalHighway.Core.Models.Settings;
using DigitalHighway.Mongodb;

namespace DigitalHighway.Host;

public static class Program
{
	public static async Task Main(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);

		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddSwaggerGen();
		builder.Services.AddCoreModule(builder.Configuration);

		builder.Services.AddOptions<MongoSettings>().Bind(builder.Configuration.GetSection(nameof(MongoSettings)));
		builder.Services.AddOptions<ApplicationSettings>().Bind(builder.Configuration.GetSection(nameof(ApplicationSettings)));

		var app = builder.Build();

		if (app.Environment.IsDevelopment())
		{
			app.UseSwagger();
			app.UseSwaggerUI();
		}

		app.UseDigitalHighwayEndpoints();
		await app.RunAsync();
	}
}
