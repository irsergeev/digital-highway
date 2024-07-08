using McMaster.Extensions.CommandLineUtils;

namespace DigitalHighway.DataInitTool;

public static class Program
{
	static void Main(string[] args) => CommandLineApplication.Execute<Application>(args);
}
