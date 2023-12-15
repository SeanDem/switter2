interface Message {
	messageId: string;
	conversationId: string;
	uid: string;
	mediaUrls: string;
	text: string;
	timestamp: string;
}

interface MessageDb {
	message_id: string;
	conversation_id: string;
	uid: string;
	media_urls: string;
	text: string;
	timestamp: string;
}
