import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { FeedbackComment } from '../../../types/feedback';

export async function fetchFeedbackComments(feedbackId: string) {
	// console.log('fetching comments');

	const commentsRef = doc(db, `comments/${feedbackId}`);
	const snapshot = await getDoc(commentsRef);
	const comments = snapshot.exists() ? snapshot.data().comments : [];
	return comments as FeedbackComment[];
}
