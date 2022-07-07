import { doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export interface AddCommentProps {
	text: string;
	feedbackId: string;
}

export async function addComment({ text, feedbackId }: AddCommentProps) {
	const commentsRef = doc(db, `comments/${feedbackId}`);

	// todo: cloud function
	// const commentDoc = await addDoc(commentsRef, {
	// 	text,
	// 	user: {
	// 		name: auth.currentUser?.displayName,
	// 		picture: auth.currentUser?.photoURL,
	// 	},
	// });
}
