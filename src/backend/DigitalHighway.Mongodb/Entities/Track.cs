namespace DigitalHighway.Mongodb.Entities;

public class Track : MongoBaseEntity
{
	public long Distance { get; set; }
	public int SurfaceType { get; set; }
	public int MaxSpeed { get; set; }

	public Point StartPoint { get; set; } = null!;
	public Point EndPoint { get; set; } = null!;
}
