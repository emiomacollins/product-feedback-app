import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import LoadQuery from '../../components/LoadQuery';
import { fetchFeedback } from './api/fetchFeedback';
import { Feedback } from '../../types/feedback';
import CreateFeedback from '../create-feedback';

export default function EditFeedback() {
	const router = useRouter();
	const {
		query: { id },
	} = router;

	const query = useQuery(['fetchFeedback', id], () => fetchFeedback(id as string));

	return (
		<LoadQuery query={query}>
			{(feedback: Feedback) => <CreateFeedback editing={feedback} />}
		</LoadQuery>
	);
}
