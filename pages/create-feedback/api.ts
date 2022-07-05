import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { FeedbackCategory, FeedbackStatus } from '../../types/feedback';

export interface Props {
	title: string;
	details: string;
	category: FeedbackCategory;
}

export default async function addFeedback(props: Props) {
	const feedbacksRef = collection(db, `feedbacks`);
	await addDoc(feedbacksRef, {
		...props,
		creator: auth.currentUser?.uid,
		comments: [],
		upVotes: {},
		dateAdded: Timestamp.now(),
		status: FeedbackStatus.suggestion,
	});
}
