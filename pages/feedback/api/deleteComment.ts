import { httpsCallable } from 'firebase/functions';
import { functions } from '../../../lib/firebase';

interface Props {
	feedbackId: string;
	commentId: string;
}

export default async function deleteComment({ feedbackId, commentId }: Props) {
	const callable = httpsCallable(functions, 'deleteComment');
	await callable({
		feedbackId,
		commentId,
	});
}
