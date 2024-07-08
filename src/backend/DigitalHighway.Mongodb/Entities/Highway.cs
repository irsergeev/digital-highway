namespace DigitalHighway.Mongodb.Entities;

public class Highway : MongoBaseEntity
{
	public IEnumerable<HighwayPart> Parts { get; set; } = Enumerable.Empty<HighwayPart>();
}
