export function formatDateSmall(
	dateString: string | null | undefined,
	language: string = 'en-US'
): string {
	if (!dateString) return '';

	const postDate = new Date(dateString);
	if (isNaN(postDate.getTime())) {
		return '';
	}

	const now = new Date();
	const diffInMs = now.getTime() - postDate.getTime();
	const diffInSec = diffInMs / 1000;
	const diffInMin = diffInSec / 60;
	const diffInHrs = diffInMin / 60;

	if (diffInMin < 60) {
		return Math.round(diffInMin) + 'm';
	} else if (diffInHrs < 24) {
		return Math.round(diffInHrs) + 'h';
	} else {
		return new Intl.DateTimeFormat(language, { month: 'short', day: '2-digit' }).format(postDate);
	}
}
export function formatDateDetailed(
	dateString: string | null | undefined,
	language: string = 'en-US'
): string {
	if (!dateString) return '';

	const date = new Date(dateString);
	if (isNaN(date.getTime())) {
		return '';
	}

	const options: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
		month: 'short',
		day: '2-digit',
		year: 'numeric'
	};

	return new Intl.DateTimeFormat(language, options).format(date);
}

export function formatDateBirthday(dateString: string | null | undefined): string {
	if (!dateString) return '';
	const date = new Date(dateString);
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const monthIndex = date.getMonth();
	const day = date.getDate() + 1;

	return `${monthNames[monthIndex]} ${day}`;
}
