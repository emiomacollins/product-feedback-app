import { httpsCallable } from 'firebase/functions';
import { functions } from '../../../lib/firebase';
import { FeedbackCommentReply } from '../../../types/feedback';

interface Props {
	feedbackId: string;
	commentId: string;
	reply: FeedbackCommentReply;
}

export default async function replyComment({ commentId, feedbackId, reply }: Props) {
	const callable = httpsCallable(functions, 'replyComment');
	await callable({
		feedbackId,
		commentId,
		reply,
	});
}
