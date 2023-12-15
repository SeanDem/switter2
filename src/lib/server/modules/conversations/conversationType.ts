import type { UserProfile } from '../userProfile';

export type Conversation = {
	conversationId: string;
	uid: string;
	otherUid: string;
};

export interface ConversationDetail
	extends Conversation,
		Pick<UserProfile, 'uid' | 'handle' | 'bio' | 'name' | 'profileUrl'> {
	lastMessageDate: string;
	lastMessagePreview: string;
}
