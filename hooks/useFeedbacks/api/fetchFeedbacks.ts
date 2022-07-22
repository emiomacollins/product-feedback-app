import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Feedback } from '../../../types/feedback';

export default async function fetchFeedbacks() {
	const ref = collection(db, `feedbacks`);
	const q = query(ref, orderBy('dateAdded', 'desc'));

	const snapshot = await getDocs(q);
	const feedbacks = snapshot.docs.map((doc) => {
		const data = doc.data();
		return {
			id: doc.id,
			...data,
			// needs to be serializable for ssr
			dateAdded: new Date(data.dateAdded.toDate()).toISOString(),
		};
	});
	return feedbacks as Feedback[];
}
