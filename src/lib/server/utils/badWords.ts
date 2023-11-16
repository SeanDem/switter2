import filter from 'bad-words';
export const badWordFilter = new filter();

export const cleanInput = (input?: string | null) =>
	input ? badWordFilter.clean(input.trim()) : input;
