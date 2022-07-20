import { callable } from '../../../lib/firebase';
import { FeedbackComment } from '../../../types/feedback';

interface Props {
	feedbackId: string;
	comment: Omit<FeedbackComment, 'id' | 'replies'>;
	isPing?: boolean;
}

export default async function addComment(data: Props) {
	await callable({
		name: 'addComment',
		data,
	});
}
