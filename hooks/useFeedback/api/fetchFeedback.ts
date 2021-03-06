import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Feedback } from '../../../types/feedback';

export default async function fetchFeedback(feedbackId: string) {
	const feedbackRef = doc(db, `feedbacks/${feedbackId}`);
	const snapshot = await getDoc(feedbackRef);

	if (!snapshot.exists()) throw new Error('Failed to fetch feedback');
	const data = snapshot.data();

	return {
		id: snapshot.id,
		...data,
		// serialize for ssr
		dateAdded: new Date(data.dateAdded.toDate()).toISOString(),
	} as Feedback;
}
