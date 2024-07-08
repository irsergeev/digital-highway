using MongoDB.Driver;

namespace DigitalHighway.Mongodb.Interfaces;

public interface IMongodbFactory
{
	IMongoClient CreateClient();
	IMongoDatabase CreateDatabase();
	IMongoDatabase CreateDatabase(IMongoClient mongoClient);
}
