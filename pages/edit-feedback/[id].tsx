import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import LoadQuery from '../../components/LoadQuery';
import { Feedback } from '../../types/feedback';
import CreateFeedback from '../create-feedback';
import fetchFeedback from './api/fetchFeedback';

export default function EditFeedback() {
	const router = useRouter();
	const {
		query: { id },
	} = router;

	const query = useQuery(['fetchFeedback', id], () => fetchFeedback(id as string), {
		cacheTime: 0,
	});

	return (
		<LoadQuery query={query}>
			{(feedback: Feedback) => <CreateFeedback editing={feedback} />}
		</LoadQuery>
	);
}
