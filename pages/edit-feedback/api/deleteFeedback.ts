import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export default async function deleteFeedback(id: string) {
	const feedbackRef = doc(db, `feedbacks/${id}`);
	await deleteDoc(feedbackRef);
}
