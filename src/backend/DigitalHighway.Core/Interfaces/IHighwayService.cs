using DigitalHighway.Contract;

namespace DigitalHighway.Core.Interfaces;

public interface IHighwayService
{
	Task<HighwayResponse> GetHighwayByIdAsync(string id);
	Task<HighwayMetadataListResponse> GetAllHighwaysAsync();
}
