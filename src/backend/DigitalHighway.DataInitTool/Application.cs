using DigitalHighway.Mongodb.Entities;
using McMaster.Extensions.CommandLineUtils;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DigitalHighway.DataInitTool;

public class Application
{
	#region constans 
	const int POINTS_COUNT = 600;
	const int MAX_DISTANCE = 2000;
	const int MIN_DISTANCE = 10;
	const int MAX_HEIGHT = 800;
	const int MIN_HEIGHT = 1;
	const int MAX_SPEED = 4;
	const int MIN_SPEED = 1;
	const int MAX_SURFACE_TYPE = 4;
	const int MIN_SURFACE_TYPE = 1;
	#endregion

	[Option(LongName = "connectionString")]
	public required string ConnectionString { get; init; }

	[Option(LongName = "database")]
	public required string DatabaseName { get; init; }

	long retriesCount = 3;

	public void OnExecute() => TryToInsertInitialData();

	public void TryToInsertInitialData()
	{
		var attempt = 1;

		while (true)
		{
			try
			{
				InsertInitialData();
				return;
			}
			catch (Exception ex) when (attempt <= retriesCount)
			{
				attempt++;
				Console.WriteLine("An error occured when trying to insert initial data to mongo db: {0}", ex);
			}
		}
	}

	private void InsertInitialData()
	{
		var mongoClient = new MongoClient(ConnectionString);
		var database = mongoClient.GetDatabase(DatabaseName);

		Console.WriteLine("Connected to: {0}, database: {1}", ConnectionString, DatabaseName);

		var random = new Random();

		var pointCollection = database.GetCollection<Point>(nameof(Point));
		var trackCollection = database.GetCollection<Track>(nameof(Track));
		var highwayCollection = database.GetCollection<Highway>(nameof(Highway));

		var emptyFilter = new BsonDocument();

		pointCollection.DeleteMany(emptyFilter);
		trackCollection.DeleteMany(emptyFilter);
		highwayCollection.DeleteMany(emptyFilter);

		Console.WriteLine("Collections: {0}, {1}, {2} have cleaned", nameof(Point), nameof(Track), nameof(Highway));

		#region generate points

		var points = new List<Point>();

		for (int i = 1; i <= POINTS_COUNT; i++)
		{
			points.Add(new Point { Name = $"Point #{i}", Height = random.Next(MIN_HEIGHT, MAX_HEIGHT) });
		}

		pointCollection.InsertMany(points);

		Console.WriteLine("{0} points have generated", POINTS_COUNT);

		#endregion

		#region highway 1 - 5 tracks

		var highway1 = new Highway();
		var parts = new List<HighwayPart>();
		Point? startPoint = null;

		for (int i = 0; i < 5; i++)
		{
			var track = new Track
			{
				Distance = random.Next(MIN_DISTANCE, MAX_DISTANCE),
				MaxSpeed = random.Next(MIN_SPEED, MAX_SPEED),
				SurfaceType = random.Next(MIN_SURFACE_TYPE, MAX_SURFACE_TYPE),
				StartPoint = startPoint ?? points[random.Next(0, POINTS_COUNT)],
				EndPoint = points[random.Next(0, POINTS_COUNT)],
			};

			startPoint = track.EndPoint;
			trackCollection.InsertOne(track);
			parts.Add(new HighwayPart { Order = i + 1, TrackId = track.Id });
		}

		highway1.Parts = parts;
		highwayCollection.InsertOne(highway1);
		startPoint = null;

		#endregion

		Console.WriteLine("Highway 1 (5 tracks) has created");

		#region highway 2 - 10 tracks

		var highway2 = new Highway();
		var parts2 = new List<HighwayPart>();

		for (int i = 0; i < 10; i++)
		{
			var track = new Track
			{
				Distance = random.Next(MIN_DISTANCE, MAX_DISTANCE),
				MaxSpeed = random.Next(MIN_SPEED, MAX_SPEED),
				SurfaceType = random.Next(MIN_SURFACE_TYPE, MAX_SURFACE_TYPE),
				StartPoint = startPoint ?? points[random.Next(0, POINTS_COUNT)],
				EndPoint = points[random.Next(0, POINTS_COUNT)],
			};

			startPoint = track.EndPoint;
			trackCollection.InsertOne(track);
			parts2.Add(new HighwayPart { Order = i + 1, TrackId = track.Id });
		}

		highway2.Parts = parts2;
		highwayCollection.InsertOne(highway2);

		startPoint = null;

		#endregion

		Console.WriteLine("Highway 2 (10 tracks) has created");

		#region highway 3 - 20 tracks

		var highway3 = new Highway();
		var parts3 = new List<HighwayPart>();

		for (int i = 0; i < 20; i++)
		{
			var track = new Track
			{
				Distance = random.Next(MIN_DISTANCE, MAX_DISTANCE),
				MaxSpeed = random.Next(MIN_SPEED, MAX_SPEED),
				SurfaceType = random.Next(MIN_SURFACE_TYPE, MAX_SURFACE_TYPE),
				StartPoint = startPoint ?? points[random.Next(0, POINTS_COUNT)],
				EndPoint = points[random.Next(0, POINTS_COUNT)],
			};

			startPoint = track.EndPoint;
			trackCollection.InsertOne(track);
			parts3.Add(new HighwayPart { Order = i + 1, TrackId = track.Id });
		}

		highway3.Parts = parts3;
		highwayCollection.InsertOne(highway3);

		startPoint = null;

		#endregion

		Console.WriteLine("Highway 3 (20 tracks) has created");

		#region highway 4 - 50 tracks

		var highway4 = new Highway();
		var parts4 = new List<HighwayPart>();

		for (int i = 0; i < 50; i++)
		{
			var track = new Track
			{
				Distance = random.Next(MIN_DISTANCE, MAX_DISTANCE),
				MaxSpeed = random.Next(MIN_SPEED, MAX_SPEED),
				SurfaceType = random.Next(MIN_SURFACE_TYPE, MAX_SURFACE_TYPE),
				StartPoint = startPoint ?? points[random.Next(0, POINTS_COUNT)],
				EndPoint = points[random.Next(0, POINTS_COUNT)],
			};

			startPoint = track.EndPoint;
			trackCollection.InsertOne(track);
			parts4.Add(new HighwayPart { Order = i + 1, TrackId = track.Id });
		}

		highway4.Parts = parts4;
		highwayCollection.InsertOne(highway4);

		startPoint = null;

		#endregion

		Console.WriteLine("Highway 4 (50 tracks) has created");

		#region highway 5 - 100 tracks

		var highway5 = new Highway();
		var parts5 = new List<HighwayPart>();

		for (int i = 0; i < 100; i++)
		{
			var track = new Track
			{
				Distance = random.Next(MIN_DISTANCE, MAX_DISTANCE),
				MaxSpeed = random.Next(MIN_SPEED, MAX_SPEED),
				SurfaceType = random.Next(MIN_SURFACE_TYPE, MAX_SURFACE_TYPE),
				StartPoint = startPoint ?? points[random.Next(0, POINTS_COUNT)],
				EndPoint = points[random.Next(0, POINTS_COUNT)],
			};

			startPoint = track.EndPoint;
			trackCollection.InsertOne(track);
			parts5.Add(new HighwayPart { Order = i + 1, TrackId = track.Id });
		}

		highway5.Parts = parts5;
		highwayCollection.InsertOne(highway5);

		startPoint = null;

		#endregion

		Console.WriteLine("Highway 5 (100 tracks) has created");

		#region highway 6 - 500 tracks

		var highway6 = new Highway();
		var parts6 = new List<HighwayPart>();

		for (int i = 0; i < 500; i++)
		{
			var track = new Track
			{
				Distance = random.Next(MIN_DISTANCE, MAX_DISTANCE),
				MaxSpeed = random.Next(MIN_SPEED, MAX_SPEED),
				SurfaceType = random.Next(MIN_SURFACE_TYPE, MAX_SURFACE_TYPE),
				StartPoint = startPoint ?? points[random.Next(0, POINTS_COUNT)],
				EndPoint = points[random.Next(0, POINTS_COUNT)],
			};

			startPoint = track.EndPoint;
			trackCollection.InsertOne(track);
			parts6.Add(new HighwayPart { Order = i + 1, TrackId = track.Id });
		}

		highway6.Parts = parts6;
		highwayCollection.InsertOne(highway6);

		startPoint = null;

		#endregion

		Console.WriteLine("Highway 6 (500 tracks) has created");

		#region highway 7 - 1000 tracks

		var highway7 = new Highway();
		var parts7 = new List<HighwayPart>();

		for (int i = 0; i < 1000; i++)
		{
			var track = new Track
			{
				Distance = random.Next(MIN_DISTANCE, MAX_DISTANCE),
				MaxSpeed = random.Next(MIN_SPEED, MAX_SPEED),
				SurfaceType = random.Next(MIN_SURFACE_TYPE, MAX_SURFACE_TYPE),
				StartPoint = startPoint ?? points[random.Next(0, POINTS_COUNT)],
				EndPoint = points[random.Next(0, POINTS_COUNT)],
			};

			startPoint = track.EndPoint;
			trackCollection.InsertOne(track);
			parts7.Add(new HighwayPart { Order = i + 1, TrackId = track.Id });
		}

		highway7.Parts = parts7;
		highwayCollection.InsertOne(highway7);

		startPoint = null;

		#endregion

		Console.WriteLine("Highway 7 (1000 tracks) has created");

		Console.WriteLine("\n\nWork ended. Success!\n\n");
	}
}
