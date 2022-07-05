import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Feedback } from '../../../types/feedback';

export default async function fetchFeedbacks() {
	const ref = collection(db, `feedbacks`);
	const snapshot = await getDocs(ref);
	const feedbacks = snapshot.docs.map((doc) => {
		const data = doc.data();
		return {
			id: doc.id,
			...data,
			dateAdded: new Date(data.dateAdded.toDate()).toISOString(),
		};
	});
	return feedbacks as Feedback[];
}
