import { httpsCallable } from 'firebase/functions';
import { functions } from '../../../lib/firebase';
import { FeedbackComment } from '../../../types/feedback';

interface Props {
	feedbackId: string;
	comment: FeedbackComment;
}

export default async function addComment({ feedbackId, comment }: Props) {
	const callable = httpsCallable(functions, 'addComment');
	await callable({
		feedbackId,
		comment,
	});
}
