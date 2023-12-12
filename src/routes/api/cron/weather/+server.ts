import { fetchWeatherAndCreateSweet } from '$lib/server/bot/weatherBot';
import { json } from '@sveltejs/kit';

export async function GET() {
	const res = fetchWeatherAndCreateSweet();
	return json({ res });
}
