using System.Linq.Expressions;

namespace DigitalHighway.Mongodb.Interfaces
{
	public interface IMongodbRepository<T>
	{
		Task<T> GetByIdAsync(string id);
		Task<IReadOnlyList<T>> GetValuesByFilterAsync(Expression<Func<T, bool>> filter);
		Task<IReadOnlyList<T>> GetValuesAsync();
	}
}
