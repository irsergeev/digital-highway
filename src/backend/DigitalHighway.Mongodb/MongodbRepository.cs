using DigitalHighway.Mongodb.Entities;
using DigitalHighway.Mongodb.Interfaces;
using MongoDB.Driver;
using System.Linq.Expressions;

namespace DigitalHighway.Mongodb;

public class MongodbRepository<T> : IMongodbRepository<T> where T : MongoBaseEntity
{
	private readonly IMongodbFactory _mongodbFactory;
	private readonly IMongoCollection<T> _collection;

	public MongodbRepository(IMongodbFactory mongodbFactory)
	{
		_mongodbFactory = mongodbFactory;
		var database = mongodbFactory.CreateDatabase();

		_collection = database.GetCollection<T>(typeof(T).Name);
	}

	public async Task<T> GetByIdAsync(string id)
	{
		var item = await _collection.FindAsync(x => x.Id == id);
		return await item.FirstOrDefaultAsync();
	}

	public async Task<IReadOnlyList<T>> GetValuesByFilterAsync(Expression<Func<T, bool>> filter)
	{
		var items = await _collection.FindAsync(filter);
		return await items.ToListAsync();
	}

	public async Task<IReadOnlyList<T>> GetValuesAsync()
		=> await GetValuesByFilterAsync(c => !string.IsNullOrWhiteSpace(c.Id));
}
