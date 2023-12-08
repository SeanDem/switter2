import { fetchWeatherAndCreateSweet } from '$lib/server/bot/weatherBot';
import { json } from '@sveltejs/kit';

export async function POST() {
	const res = fetchWeatherAndCreateSweet();
	console.log(res);
	return json({ res });
}
