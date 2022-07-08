import * as functions from 'firebase-functions';

const { onCall, HttpsError } = functions.https;

interface Props {
	feedbackId: string;
	text: string;
	user: { name: string; picture: string };
}

const addComment = onCall((data: Props, context) => {
	const { auth } = context;
	const {
		feedbackId,
		text,
		// user: { name, picture },
	} = data;

	if (!auth) throw new HttpsError('unauthenticated', 'permission denied');
	if (text.length < 4 || text.length > 250)
		throw new HttpsError(
			'invalid-argument',
			'comment length should be between 4 & 250 characters'
		);

	return data;
});

export default addComment;
