export class ResponseUtils {
	static error(message: string, status: number = 500): Response {
		return new Response(message, {
			status,
			headers: {
				'Content-Type': 'text/plain'
			}
		});
	}
}
