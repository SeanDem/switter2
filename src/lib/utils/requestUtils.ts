export class ResponseUtils {
	static success(body: any, status: number = 200): Response {
		return new Response(JSON.stringify(body), {
			status,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	static redirect(location: string, status: number = 303): Response {
		return new Response(null, {
			status,
			headers: {
				Location: location
			}
		});
	}

	static error(message: string, status: number = 500): Response {
		return new Response(message, {
			status,
			headers: {
				'Content-Type': 'text/plain'
			}
		});
	}

	static unauthorized(message: string = 'You are not logged in.'): Response {
		return ResponseUtils.error(message, 401);
	}

	static badRequest(message: string = 'Invalid input.'): Response {
		return ResponseUtils.error(message, 400);
	}
}
