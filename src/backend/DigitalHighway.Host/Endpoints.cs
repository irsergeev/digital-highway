using DigitalHighway.Core.Interfaces;

namespace DigitalHighway.Host;

public static class Endpoints
{
	public static void UseDigitalHighwayEndpoints(this WebApplication app)
	{
		var highwayApiGroup = app.MapGroup("api/v1/highway");

		highwayApiGroup.MapGet("/{id}", GetHighwayByIdAsync);
		highwayApiGroup.MapGet("/metadata", GetAllHighwaysAsync);
	}

	private static async Task<IResult> GetHighwayByIdAsync(string id, IHighwayService highwayService)
		=> TypedResults.Ok(await highwayService.GetHighwayByIdAsync(id));

	private static async Task<IResult> GetAllHighwaysAsync(IHighwayService highwayService)
		=> TypedResults.Ok(await highwayService.GetAllHighwaysAsync());

}
