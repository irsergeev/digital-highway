using DigitalHighway.Mongodb.Interfaces;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DigitalHighway.Mongodb;

public class MongodbFactory (IOptions<MongoSettings> mongoSettings) : IMongodbFactory
{
	private readonly MongoSettings _mongoSettings = mongoSettings.Value;

	public IMongoClient CreateClient() => new MongoClient(_mongoSettings.ConnectionString);
	public IMongoDatabase CreateDatabase(IMongoClient mongodbClient) => mongodbClient.GetDatabase(_mongoSettings.DatabaseName);

	public IMongoDatabase CreateDatabase()
	{
		var mongodbClient = CreateClient();
		return mongodbClient.GetDatabase(_mongoSettings.DatabaseName);
	}
}
