import { httpsCallable } from 'firebase/functions';
import { auth, functions } from '../../../lib/firebase';

// todo create enum for callable functions

interface Props {
	feedbackId: string;
	isPing?: boolean;
}

export default async function toggleUpvote({ feedbackId, isPing = false }: Props) {
	const { uid } = auth.currentUser || {};
	const callable = httpsCallable(functions, 'toggleUpvote');
	await callable({ feedbackId, uid, isPing });
}
