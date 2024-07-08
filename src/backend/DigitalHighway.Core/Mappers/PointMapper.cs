using AutoMapper;
using DigitalHighway.Contract;
using DigitalHighway.Mongodb.Entities;

namespace DigitalHighway.Core.Mappers;

public class PointMapper : Profile
{
	public PointMapper()
	{
		CreateMap<Point, PointDto>();
	}
}
