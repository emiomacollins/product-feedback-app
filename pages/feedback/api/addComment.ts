import { httpsCallable } from 'firebase/functions';
import { auth, functions } from '../../../lib/firebase';

export interface AddCommentProps {
	text: string;
	feedbackId: string;
}

export async function addComment({ text, feedbackId }: AddCommentProps) {
	const callable = httpsCallable(functions, 'addComment');
	const { data } = await callable({
		feedbackId,
		text,
		user: {
			name: auth.currentUser?.displayName,
			picture: auth.currentUser?.photoURL,
		},
	});
}
