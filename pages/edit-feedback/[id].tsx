import { useRouter } from 'next/router';
import { Fragment } from 'react';
import LoadQuery from '../../components/LoadQuery';
import { routes } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { useFeedback } from '../../hooks/useFeedback/useFeedback';
import CreateFeedback from '../create-feedback';

export default function EditFeedback() {
	const router = useRouter();
	const { user } = useAuth();

	const {
		query: { id },
	} = router;

	const query = useFeedback({
		id: id as string,
	});

	return (
		<LoadQuery query={query}>
			{(feedback) => {
				if (feedback.creator !== user?.uid) {
					router.push(routes.createFeedback);
					return <Fragment></Fragment>;
				}
				return <CreateFeedback editing={feedback} />;
			}}
		</LoadQuery>
	);
}
