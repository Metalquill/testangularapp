import { Component, OnInit, Input  } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';

@Component({
    selector: 'weather-component',
    imports: [],
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css'],
    standalone: true,
})
export class WeatherComponent implements OnInit {

  weatherData: any = null;

  async ngOnInit() {


const params = {
	latitude: -43.532055,
	longitude: 172.63623,
	daily: ["sunrise", "sunset", "temperature_2m_max", "temperature_2m_min", "apparent_temperature_max", "apparent_temperature_min", "wind_speed_10m_max", "wind_gusts_10m_max", "wind_direction_10m_dominant", "precipitation_sum", "rain_sum", "weather_code"],
	hourly: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "rain", "pressure_msl", "wind_speed_80m", "temperature_80m", "soil_temperature_6cm", "wet_bulb_temperature_2m", "uv_index", "weather_code"],
	current: ["temperature_2m", "relative_humidity_2m", "rain", "weather_code", "wind_speed_10m", "wind_direction_10m", "apparent_temperature"],
	timezone: "Pacific/Auckland",
	forecast_days: 1,
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
	`\nCoordinates: ${latitude}°N ${longitude}°E`,
	`\nElevation: ${elevation}m asl`,
	`\nTimezone: ${timezone} ${timezoneAbbreviation}`,
	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
);

const weatherNumberToString: { [key: number]: string } = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Drizzle: Light",
  53: "Drizzle: Moderate",
  55: "Drizzle: Heavy",
  56: "Freezing Drizzle: Light",
  57: "Freezing Drizzle: Moderate",
  58: "Freezing Drizzle: Heavy",
  61: "Rain: Light",
  63: "Rain: Moderate",
  65: "Rain: Heavy",
  66: "Freezing Rain: Light",
  67: "Freezing Rain: Moderate",
  68: "Freezing Rain: Heavy",
  71: "Snow fall: Light",
  73: "Snow fall: Moderate",
  75: "Snow fall: Heavy",
  77: "Snow grains",
  80: "Rain showers: Light",
  81: "Rain showers: Moderate",
  82: "Rain showers: Violent",
  85: "Snow showers: Light",
  86: "Snow showers: Heavy",
  95: "Thunderstorm: Light or moderate",
  96: "Thunderstorm: With slight hail",
  99: "Thunderstorm: With heavy hail",
}

const current = response.current()!;
const hourly = response.hourly()!;
const daily = response.daily()!;

// Define Int64 variables so they can be processed accordingly
const sunrise = daily.variables(0)!;
const sunset = daily.variables(1)!;

// Note: The order of weather variables in the URL query and the indices below need to match!
this.weatherData = {
	current: {
		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		temperature_2m: current.variables(0)!.value(),
		relative_humidity_2m: current.variables(1)!.value(),
		rain: current.variables(2)!.value(),
		weather_code: current.variables(3)!.value(),
		wind_speed_10m: current.variables(4)!.value(),
		wind_direction_10m: current.variables(5)!.value(),
		apparent_temperature: current.variables(6)!.value(),
	},
	hourly: {
		time: Array.from(
			{ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
			(_ , i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m: hourly.variables(0)!.valuesArray(),
		relative_humidity_2m: hourly.variables(1)!.valuesArray(),
		apparent_temperature: hourly.variables(2)!.valuesArray(),
		rain: hourly.variables(3)!.valuesArray(),
		pressure_msl: hourly.variables(4)!.valuesArray(),
		wind_speed_80m: hourly.variables(5)!.valuesArray(),
		temperature_80m: hourly.variables(6)!.valuesArray(),
		soil_temperature_6cm: hourly.variables(7)!.valuesArray(),
    wet_bulb_temperature_2m: hourly.variables(8)!.valuesArray(),
		uv_index: hourly.variables(9)!.valuesArray(),
    weather_code: hourly.variables(10)!.valuesArray(),
	},
	daily: {
		time: Array.from(
			{ length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, 
			(_ , i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
		),
		// Map Int64 values to according structure
		sunrise: [...Array(sunrise.valuesInt64Length())].map(
			(_ , i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
		),
		// Map Int64 values to according structure
		sunset: [...Array(sunset.valuesInt64Length())].map(
			(_ , i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
		),
		temperature_2m_max: daily.variables(2)!.valuesArray(),
		temperature_2m_min: daily.variables(3)!.valuesArray(),
		apparent_temperature_max: daily.variables(4)!.valuesArray(),
		apparent_temperature_min: daily.variables(5)!.valuesArray(),
		wind_speed_10m_max: daily.variables(6)!.valuesArray(),
		wind_gusts_10m_max: daily.variables(7)!.valuesArray(),
		wind_direction_10m_dominant: daily.variables(8)!.valuesArray(),
		precipitation_sum: daily.variables(9)!.valuesArray(),
		rain_sum: daily.variables(10)!.valuesArray(),
    weather_code: daily.variables(11)!.valuesArray(),
	},
};

// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
console.log(
	`\nCurrent time: ${this.weatherData.current.time}\n`,
	`\nCurrent temperature_2m: ${this.weatherData.current.temperature_2m.toPrecision(3)}`,
	`\nCurrent relative_humidity_2m: ${this.weatherData.current.relative_humidity_2m.toPrecision(3)}`,
	`\nCurrent rain: ${this.weatherData.current.rain}`,
	`\nCurrent weather_code: ${weatherNumberToString[this.weatherData.current.weather_code] || "Unknown weather code"}`,
	`\nCurrent wind_speed_10m: ${this.weatherData.current.wind_speed_10m.toPrecision(3)}`,
	`\nCurrent wind_direction_10m: ${this.weatherData.current.wind_direction_10m.toPrecision(3)}`,
	`\nCurrent apparent_temperature: ${this.weatherData.current.apparent_temperature.toPrecision(3)}`,
);
console.log("\nHourly data:\n", this.weatherData.hourly)
console.log("\nDaily data:\n", this.weatherData.daily)
  }
}

