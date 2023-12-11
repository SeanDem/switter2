import { supabase } from '$lib/utils/supabaseClient';

interface Location {
	lat: string;
	lng: string;
	city: string;
}
const locations: Location[] = [
	{ lat: '42.3601', lng: '-71.0589', city: 'Boston' },
	{ lat: '34.0522', lng: '-118.2437', city: 'Los Angeles' },
	{ lat: '40.7128', lng: '-74.0060', city: 'New York City' },
	{ lat: '41.8781', lng: '-87.6298', city: 'Chicago' },
	{ lat: '33.7490', lng: '-84.3880', city: 'Atlanta' }
];

async function fetchPointData(location: Location): Promise<any> {
	const response = await fetch(`https://api.weather.gov/points/${location.lat},${location.lng}`);
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	return response.json();
}

async function fetchForecastData(forecastUrl: string): Promise<any> {
	const response = await fetch(forecastUrl);
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	return response.json();
}

async function createSweet(uid: string, text: string): Promise<any> {
	const { data, error } = await supabase.from('sweet').insert({ uid, text }).single();
	if (error) throw new Error(error.message);
	return data;
}

export async function fetchWeatherAndCreateSweet(): Promise<void> {
	const uid = 'aeecbb24-346b-4200-9fef-c3368f38f915';
	try {
		const weatherReports = await Promise.all(
			locations.map(async (location) => {
				const pointData = await fetchPointData(location);
				const forecastUrl = pointData.properties?.forecast;
				if (!forecastUrl) {
					throw new Error('No forecast URL available for the specified location.');
				}

				const forecastData = await fetchForecastData(forecastUrl);
				const period = forecastData.properties?.periods[0];
				if (!period) {
					throw new Error('No weather forecast data available.');
				}

				return `${location.city} weather ${String(period.name).toLowerCase} is: ${
					String(period.detailedForecast).toLowerCase
				}, with a high near ${period.temperature}°${period.temperatureUnit}.`;
			})
		);

		for (const forecastText of weatherReports) {
			if (forecastText) {
				const sweet = await createSweet(uid, forecastText);
				console.log('Sweet created:', forecastText);
			} else {
				console.log('No forecast text available.');
			}
		}
	} catch (error) {
		console.error('Error:', error);
	}
}
