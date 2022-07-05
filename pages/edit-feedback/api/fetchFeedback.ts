import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Feedback } from '../../../types/feedback';

export default async function fetchFeedback(feedbackId: string) {
	const feedbackRef = doc(db, `feedbacks/${feedbackId}`);
	const snapshot = await getDoc(feedbackRef);
	return { id: snapshot.id, ...snapshot.data() } as Feedback;
}
