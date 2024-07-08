namespace DigitalHighway.Mongodb.Entities;

public class Point : MongoBaseEntity
{
	public string Name { get; set; } = string.Empty;
	public int Height { get; set; }
}
