using AutoMapper;
using DigitalHighway.Contract;
using DigitalHighway.Core.Interfaces;
using DigitalHighway.Core.Models.Settings;
using DigitalHighway.Mongodb.Entities;
using DigitalHighway.Mongodb.Interfaces;
using Microsoft.Extensions.Options;

namespace DigitalHighway.Core.Services;

public class HighwayService(
	IMongodbRepository<Highway> highwayRepository,
	IMongodbRepository<Track> trackRepository,
	IMapper mapper,
	IOptions<ApplicationSettings> applicationSettings) : IHighwayService
{
	private readonly IMongodbRepository<Highway> _highwayRepository = highwayRepository;
	private readonly IMongodbRepository<Track> _trackRepository = trackRepository;
	private readonly IMapper _mapper = mapper;
	private readonly ApplicationSettings _applicationSettings = applicationSettings.Value;

	public async Task<HighwayResponse> GetHighwayByIdAsync(string id)
	{
		var highway = await _highwayRepository.GetByIdAsync(id);

		if (highway == null)
		{
			throw new ArgumentNullException(nameof(highway));
		}

		var trackKeys = highway.Parts.Select(c => c.TrackId).ToList();
		var tracks = await _trackRepository.GetValuesByFilterAsync(c => trackKeys.Contains(c.Id));

		var response = new HighwayResponse
		{
			Id = highway.Id,
		};

		var highwayParts = new List<HighwayPartDto>();

		foreach (var part in highway.Parts)
		{
			var track = tracks.FirstOrDefault(c => c.Id == part.TrackId);

			if (track != null)
			{
				highwayParts.Add(new()
				{
					Order = part.Order,
					Track = _mapper.Map<TrackDto>(track),
				});
			}
		}

		response.Parts = highwayParts;
		return response;
	}

	public async Task<HighwayMetadataListResponse> GetAllHighwaysAsync()
	{
		var response = new HighwayMetadataListResponse();

		var items = await _highwayRepository.GetValuesAsync();
		var responseData = new List<HighwayMetadataDto>();

		foreach (var item in items)
		{
			var highwayMetadata = new HighwayMetadataDto();

			var trackIdentities = item.Parts.Select(c => c.TrackId);
			var tracks = await _trackRepository.GetValuesByFilterAsync(c => trackIdentities.Contains(c.Id));

			highwayMetadata.TotalDistance = tracks.Select(c => c.Distance).Sum();
			highwayMetadata.TracksCount = tracks.Count;
			highwayMetadata.Id = item.Id;

			var points = new List<int>();

			for (int i = 0; i < _applicationSettings.MaxPointsInHighwayMetadata; i++)
			{
				if (tracks.Count <= (i+1)) break;

				points.Add(tracks[i].StartPoint.Height);
			}

			highwayMetadata.Points = points;
			responseData.Add(highwayMetadata);
		}

		response.Data = responseData;
		return response;
	}
}
