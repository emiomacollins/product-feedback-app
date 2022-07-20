import { callable } from '../../../lib/firebase';
import { FeedbackCommentReply } from '../../../types/feedback';

interface Props {
	feedbackId: string;
	commentId: string;
	reply: FeedbackCommentReply;
	isPing?: boolean;
}

export default async function replyComment(data: Props) {
	await callable({
		name: 'replyComment',
		data,
	});
}
