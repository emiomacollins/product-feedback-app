import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { Feedback } from '../../types/feedback';

async function fetchFeedbacks() {
	const ref = collection(db, `feedbacks`);
	const snapshot = await getDocs(ref);
	const feedbacks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	return feedbacks as Feedback[];
}

// TODO: A better way would be to use a cloudfunction to implement the Upvote & Comment functionality

async function toggleUpvote(feedback: Feedback) {
	const { id } = feedback;
	const { uid } = auth.currentUser || {};

	const feedbackRef = doc(db, `feedbacks/${id}`);
	const upToDateFeedback = (await getDoc(feedbackRef)).data() as Feedback;
	const { upVotes } = upToDateFeedback;

	if (!uid) return;

	// delet userId property if already upVoted else add userId property as true
	const { [uid]: userUpvote, ...withoutUserUpvotes } = upVotes;

	await updateDoc(feedbackRef, {
		upVotes: { ...withoutUserUpvotes, ...(userUpvote ? {} : { [uid]: true }) },
	});
}

const api = {
	fetchFeedbacks,
	toggleUpvote,
};

export default api;
