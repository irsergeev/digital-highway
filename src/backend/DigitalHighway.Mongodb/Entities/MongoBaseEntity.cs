using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace DigitalHighway.Mongodb.Entities;

public abstract class MongoBaseEntity
{
	[BsonId]
	[BsonRepresentation(BsonType.ObjectId)]
	public string Id { get; set; } = string.Empty;
}
