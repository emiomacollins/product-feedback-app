import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { FeedbackComment } from '../../../types/feedback';

// better way to store would have been feedbacks/{feedbackID}/comments/{commentID}
export async function fetchFeedbackComments(feedbackId: string) {
	const commentsRef = doc(db, `comments/${feedbackId}`);
	const snapshot = await getDoc(commentsRef);
	const comments = snapshot.exists() ? snapshot.data().comments : [];
	return comments as FeedbackComment[];
}
