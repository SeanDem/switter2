import { HttpStatus, type APIResponse } from '../modules/types/types';

export function safeExecuteList<T>(func: () => T): T | null {
	try {
		return func();
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function executeWithApiResponse<T>(
	func: () => Promise<T>
): Promise<APIResponse<T | null>> {
	try {
		const data = await func();
		return { data, status: HttpStatus.OK, message: 'Success' };
	} catch (error: any) {
		console.error(error);
		return {
			data: null,
			status: HttpStatus.InternalServerError,
			message: 'An error occurred'
		};
	}
}
