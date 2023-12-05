export function safeExecuteList<T>(func: () => T): T | [] {
	try {
		return func();
	} catch (error) {
		console.error(error);
		return [];
	}
}

export function safeExecuteObj<T>(func: () => T): T | {} {
	try {
		return func();
	} catch (error) {
		console.error(error);
		return {};
	}
}
