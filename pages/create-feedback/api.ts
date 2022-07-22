import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { FeedbackCategory, FeedbackStatus } from '../../types/feedback';

export interface CreateFeedbackProps {
	title: string;
	details: string;
	category: FeedbackCategory;
}

// TODO: either add security rules to validate properties or use cloud functions to create
export default async function createFeedback(props: CreateFeedbackProps) {
	const feedbacksRef = collection(db, `feedbacks`);
	await addDoc(feedbacksRef, {
		...props,
		creator: auth.currentUser?.uid,
		commentCount: 0,
		upVotes: {},
		dateAdded: Timestamp.now(),
		status: FeedbackStatus.suggestion,
	});
}
