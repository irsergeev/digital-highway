FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# build app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ENV PATH="$PATH:/root/.dotnet/tools"

COPY ./src ./src

WORKDIR /src/backend/DigitalHighway.Host
RUN dotnet publish "DigitalHighway.Host.csproj" -c Release -o /app/publish

# main container
FROM base AS final
COPY --from=build /app/publish .
ENTRYPOINT dotnet DigitalHighway.Host.dll
