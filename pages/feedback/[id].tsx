import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import GoBackLink from '../../components/curried/GoBackLink';
import { Card } from '../../components/styled-components/Card';
import { contentStyles } from '../../components/styled-components/Content';
import { flexStyles } from '../../components/styled-components/Flex';
import { routes } from '../../constants/routes';
import FeedbackCard from '../../home/components/FeedbackCard/FeedbackCard';
import NoFeedbackMessage from '../../home/components/NoFeedbackMessage';
import fetchFeedback from '../../hooks/useFeedback/api/fetchFeedback';
import { useFeedback } from '../../hooks/useFeedback/useFeedback';
import { fetchFeedbackComments } from '../../hooks/useFeedbackComments/api/fetchFeedbackComments';
import { useFeedbackComments } from '../../hooks/useFeedbackComments/useFeedbackComments';
import { Feedback as FeedbackType, FeedbackComment } from '../../types/feedback';
import AddComment from './components/AddCommentForm';
import Comment from './components/Comment';
interface Props {
	initialFeedback: FeedbackType | null;
	initialComments: FeedbackComment[];
}

export default function Feedback({ initialFeedback, initialComments }: Props) {
	const router = useRouter();
	const { id } = router.query;
	const { data: feedback } = useFeedback({
		id: id as string,
		initialValue: initialFeedback,
	});

	const { data: comments } = useFeedbackComments({
		id: id as string,
		initialValue: initialComments,
	});

	const commentCount = comments?.length || 0;

	return (
		<Container>
			<Header>
				<GoBackLink />
				<Link href={`${routes.editFeedback}/${id}`}>
					<Button $color='blue-dark'>Edit Feedback</Button>
				</Link>
			</Header>

			{feedback ? (
				<Fragment>
					<FeedbackCard feedback={feedback} />

					<AddComment feedback={feedback} />

					{commentCount > 0 && (
						<Comments>
							<Heading>
								{commentCount} Comment{commentCount !== 1 && 's'}
							</Heading>
							{comments?.map((comment) => (
								<Comment key={comment.text} comment={comment} />
							))}
						</Comments>
					)}
				</Fragment>
			) : (
				<NoFeedbackMessage
					message='Feedback Not Found'
					details='The Feedback you are looking for does not exist.'
					CustomButton={
						<Link href={routes.home}>
							<Button>Go to Homepage</Button>
						</Link>
					}
				/>
			)}
		</Container>
	);
}

const Container = styled.div`
	${contentStyles}
	max-width: 700px;
	display: grid;
	gap: 3rem;
	margin-bottom: 10rem;
`;

const Header = styled.div`
	${flexStyles}
	justify-content: space-between;
`;

const Comments = styled(Card)`
	padding-block: 2.5rem;
	display: grid;
	gap: 1rem;
`;

const Heading = styled.h3`
	color: var(--blue-dark);
`;

export async function getServerSideProps(props: GetServerSidePropsContext) {
	const { query: pathQuery } = props;
	const { id } = pathQuery;

	try {
		const initialFeedback = await fetchFeedback(id as string);
		const initialComments = await fetchFeedbackComments(id as string);

		return {
			props: {
				initialFeedback,
				initialComments,
			},
		};
	} catch (error) {
		return {
			props: {
				initialFeedback: null,
				initialComments: [],
			},
		};
	}
}
