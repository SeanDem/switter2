export interface APIResponse<T> {
	status: HttpStatus;
	message?: string;
	data?: T;
}
export class APIResponse<T> {
	constructor(status: HttpStatus, message?: string, data?: T) {
		this.status = status;
		this.message = message;
		this.data = data;
	}
}
export enum HttpStatus {
	OK = 200,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	InternalServerError = 500
}
