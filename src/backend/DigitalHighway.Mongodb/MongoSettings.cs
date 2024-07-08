namespace DigitalHighway.Mongodb;

public class MongoSettings
{
	public required string ConnectionString { get; set; } = string.Empty;
	public required string DatabaseName { get; set;} = string.Empty;
}
