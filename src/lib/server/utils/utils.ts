import { HttpStatus, type APIResponse } from '../modules/types/types';

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
			message: error.message
		};
	}
}

export async function executeSafe<T>(func: () => Promise<T>): Promise<T | null> {
	try {
		const data = await func();
		return data;
	} catch (error: any) {
		console.error(error);
		return null;
	}
}
