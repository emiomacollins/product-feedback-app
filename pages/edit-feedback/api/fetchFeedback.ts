import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Feedback } from '../../../types/feedback';

export async function fetchFeedback(feedbackId: string) {
	const feedbackRef = doc(db, `feedbacks/${feedbackId}`);
	const feedback = (await getDoc(feedbackRef)).data();
	return feedback as Feedback;
}
