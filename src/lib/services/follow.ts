export async function follow(followUid: string) {
	const res = await fetch('/api/action/follow', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(followUid)
	});
	return res.json();
}
export async function unfollow(followUid: string) {
	const res = await fetch('/api/action/unfollow', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(followUid)
	});
	return res.json();
}
