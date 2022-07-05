import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase';
import { fetchFeedback } from '../../../pages/edit-feedback/api/fetchFeedback';

/* TODO: 
    A better way would be to use a cloudfunction to implement the Upvote & Comment functionality
    pros: 
        No complicated security rule to prevent misuse, 
        no keeping comments collection and feedback commentsId array in sync,
*/

export default async function toggleUpvote(feedbackId: string) {
	const { uid } = auth.currentUser || {};
	const feedbackRef = doc(db, `feedbacks/${feedbackId}`);
	const upToDateFeedback = await fetchFeedback(feedbackId);
	const { upVotes } = upToDateFeedback;

	if (!uid) return;

	// delet userId property if already upVoted else add userId property as true
	const { [uid]: userUpvote, ...withoutUserUpvotes } = upVotes;
	await updateDoc(feedbackRef, {
		upVotes: { ...withoutUserUpvotes, ...(userUpvote ? {} : { [uid]: true }) },
	});
}
