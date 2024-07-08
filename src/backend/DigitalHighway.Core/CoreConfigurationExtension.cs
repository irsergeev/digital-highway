using DigitalHighway.Core.Interfaces;
using DigitalHighway.Core.Services;
using DigitalHighway.Mongodb.Interfaces;
using DigitalHighway.Mongodb;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace DigitalHighway.Core;

public static class CoreConfigurationExtension
{
	public static void AddCoreModule(this IServiceCollection services, IConfigurationManager configuration)
	{
		services.AddAutoMapper(Assembly.GetExecutingAssembly());
		services.AddSingleton<IMongodbFactory, MongodbFactory>();

		services.AddSingleton(typeof(IMongodbRepository<>), typeof(MongodbRepository<>));
		services.AddSingleton<IHighwayService, HighwayService>();
	}
}
