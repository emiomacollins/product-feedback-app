import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Feedback } from '../../../types/feedback';

export default async function updateFeedback(feedback: Feedback) {
	const { id, title, details, category, status } = feedback;
	const feedbacksRef = doc(db, `feedbacks/${id}`);

	await updateDoc(feedbacksRef, {
		title,
		details,
		category,
		status,
	});
}
