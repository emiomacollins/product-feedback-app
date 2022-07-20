import { callable } from '../../../lib/firebase';

// TODO: create enum for callable functions

interface Props {
	feedbackId: string;
	isPing?: boolean;
}

export default async function toggleUpvote(data: Props) {
	await callable({
		name: 'toggleUpvote',
		data,
	});
}
