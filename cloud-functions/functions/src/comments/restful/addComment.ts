import * as functions from 'firebase-functions';
import { firestore } from '../../config/config';

const { onCall, HttpsError } = functions.https;

interface Props {
	feedbackId: string;
	text: string;
	user: { name: string; picture: string };
}

const addComment = onCall(async (data: Props, context) => {
	const { auth } = context;
	const { feedbackId, text, user } = data;

	if (!auth) throw new HttpsError('unauthenticated', 'permission denied');

	if (text.length < 4 || text.length > 250)
		throw new HttpsError(
			'invalid-argument',
			'comment length should be between 4 & 250 characters'
		);

	const commentsRef = firestore.doc(`comments/${feedbackId}`);
	const feedbackRef = firestore.doc(`feedbacks/${feedbackId}`);

	const commentsSnapshot = await commentsRef.get();
	const feedbackSnapshot = await feedbackRef.get();

	const comments = commentsSnapshot.data()?.comments || [];
	const feedback = feedbackSnapshot.data();

	const updatedComments = [
		...comments,
		{
			text,
			user,
		},
	];

	await commentsRef.set({
		comments: updatedComments,
	});

	feedback && (await feedbackRef.update({ commentCount: feedback.commentCount + 1 }));

	return updatedComments;
});

export default addComment;
