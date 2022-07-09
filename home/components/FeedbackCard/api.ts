import { httpsCallable } from 'firebase/functions';
import { auth, functions } from '../../../lib/firebase';

// todo create enum for callable functions

export default async function toggleUpvote(feedbackId: string) {
	const { uid } = auth.currentUser || {};
	const callable = httpsCallable(functions, 'toggleUpvote');
	await callable({ feedbackId, uid });
}
