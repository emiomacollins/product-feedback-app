/* eslint-disable react-hooks/exhaustive-deps */
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import GoBackLink from '../../components/curried/GoBackLink';
import { Card } from '../../components/styled-components/Card';
import { contentStyles } from '../../components/styled-components/Content';
import { flexStyles } from '../../components/styled-components/Flex';
import { routes } from '../../constants/routes';
import FeedbackCard from '../../home/components/FeedbackCard/FeedbackCard';
import NoFeedbackMessage from '../../home/components/NoFeedbackMessage';
import { useAuth } from '../../hooks/useAuth';
import fetchFeedback from '../../hooks/useFeedback/api/fetchFeedback';
import { useFeedback } from '../../hooks/useFeedback/useFeedback';
import { fetchFeedbackComments } from '../../hooks/useFeedbackComments/api/fetchFeedbackComments';
import { useFeedbackComments } from '../../hooks/useFeedbackComments/useFeedbackComments';
import { Feedback as FeedbackType, FeedbackComment } from '../../types/feedback';
import addComment from './api/addComment';
import replyComment from './api/replyComment';
import AddComment from './components/AddCommentForm';
import Comment from './components/Comment';
interface Props {
	initialFeedback: FeedbackType | null;
	initialComments: FeedbackComment[];
}

export default function Feedback({ initialFeedback, initialComments }: Props) {
	const router = useRouter();
	const { user } = useAuth();
	const { id } = router.query;
	const [pinged, setPinged] = useState(false);

	const { data: feedback } = useFeedback({
		id: id as string,
		options: {
			initialData: initialFeedback,
		},
	});

	const { data: comments } = useFeedbackComments({
		id: id as string,
		options: {
			initialData: initialComments,
		},
	});

	const commentCount = comments?.length || 0;
	const userOwnsFeedback = feedback?.creator === user?.uid;

	useEffect(() => {
		if (!user || pinged) return;
		// ping cloud functions to reduce cold start
		replyComment({ isPing: true, commentId: '', feedbackId: '', reply: {} as any });
		addComment({ isPing: true, feedbackId: '', comment: {} as any });
		setPinged(true);
	}, []);

	return (
		<Container>
			<Header>
				<GoBackLink to={routes.home} />
				<Link href={`${routes.editFeedback}/${id}`}>
					<Button
						$color='blue-dark'
						disabled={!userOwnsFeedback}
						tooltip={
							userOwnsFeedback ? '' : 'You can only edit your feedback'
						}
					>
						Edit Feedback
					</Button>
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
							{comments?.map((comment, i) => (
								<Comment key={comment.text + i} comment={comment} />
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
	max-width: 725px;
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
