import { callable } from '../../../lib/firebase';

interface Props {
	feedbackId: string;
	commentId: string;
}

export default async function deleteComment(data: Props) {
	await callable({
		name: 'deleteComment',
		data,
	});
}
