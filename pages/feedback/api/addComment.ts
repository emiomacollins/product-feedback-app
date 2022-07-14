import { httpsCallable } from 'firebase/functions';
import { functions } from '../../../lib/firebase';
import { FeedbackComment } from '../../../types/feedback';

interface Props {
	feedbackId: string;
	comment: Omit<FeedbackComment, 'id' | 'replies'>;
	isPing?: boolean;
}

export default async function addComment({ feedbackId, comment, isPing = false }: Props) {
	const callable = httpsCallable(functions, 'addComment');
	await callable({
		feedbackId,
		comment,
		isPing,
	});
}
