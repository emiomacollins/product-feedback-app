import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default async function fetchFeedbacks() {
	const ref = collection(db, `feedbacks`);
	const snapshot = await getDocs(ref);
	const feedbacks = snapshot.docs.map((doc) => doc.data());
	return feedbacks;
}
