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
