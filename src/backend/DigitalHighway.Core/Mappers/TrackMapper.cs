using AutoMapper;
using DigitalHighway.Contract;
using DigitalHighway.Mongodb.Entities;

namespace DigitalHighway.Core.Mappers;

public class TrackMapper : Profile
{
	public TrackMapper()
	{
		CreateMap<Track, TrackDto>();
	}
}
