import { HttpStatus, type APIResponse } from '../modules/types/types';

export function createErrorResponse<T>(
	message: string,
	error?: any,
	logError: boolean = true
): APIResponse<T | null> {
	if (logError && error) {
		console.error(error);
	}
	return {
		data: null,
		status: HttpStatus.InternalServerError,
		message
	};
}


