import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	Timestamp,
	updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { Feedback, FeedbackCategory, FeedbackStatus } from '../../types/feedback';

async function fetchFeedbacks() {
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

/* TODO: 
    A better way would be to use a cloudfunction to implement the Upvote & Comment functionality
    pros: 
        No complicated security rule to prevent misuse, 
        no keeping comments collection and feedback commentsId array in sync,
*/

async function toggleUpvote(feedbackId: string) {
	const { uid } = auth.currentUser || {};
	const feedbackRef = doc(db, `feedbacks/${feedbackId}`);
	const upToDateFeedback = (await getDoc(feedbackRef)).data() as Feedback;
	const { upVotes } = upToDateFeedback;

	if (!uid) return;
	// delet userId property if already upVoted else add userId property as true
	const { [uid]: userUpvote, ...withoutUserUpvotes } = upVotes;
	await updateDoc(feedbackRef, {
		upVotes: { ...withoutUserUpvotes, ...(userUpvote ? {} : { [uid]: true }) },
	});
}

interface AddFeefbackProps {
	title: string;
	details: string;
	category: FeedbackCategory;
}

async function addFeedback(props: AddFeefbackProps) {
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

const feedbacksApi = {
	fetchFeedbacks,
	toggleUpvote,
	addFeedback,
};

export default feedbacksApi;
