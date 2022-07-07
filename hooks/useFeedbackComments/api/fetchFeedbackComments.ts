import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { FeedbackComment } from '../../../types/feedback';

export async function fetchFeedbackComments(feedbackId: string) {
	const commentsRef = doc(db, `comments/${feedbackId}`);
	const comments = await (await getDoc(commentsRef)).data();
	return comments as FeedbackComment[];
}
