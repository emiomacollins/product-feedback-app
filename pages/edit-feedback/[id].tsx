import { useRouter } from 'next/router';
import LoadQuery from '../../components/LoadQuery';
import { useFeedback } from '../../hooks/useFeedback/useFeedback';
import { Feedback } from '../../types/feedback';
import CreateFeedback from '../create-feedback';

export default function EditFeedback() {
	const router = useRouter();
	const {
		query: { id },
	} = router;

	const query = useFeedback({ id: id as string });

	return (
		<LoadQuery query={query}>
			{(feedback: Feedback) => <CreateFeedback editing={feedback} />}
		</LoadQuery>
	);
}
