import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import Button from '../../components/Button';
import GoBackLink from '../../components/curried/GoBackLink';
import { Card } from '../../components/styled-components/Card';
import { contentStyles } from '../../components/styled-components/Content';
import { flexStyles } from '../../components/styled-components/Flex';
import { routes } from '../../constants/routes';
import FeedbackCard from '../../home/components/FeedbackCard/FeedbackCard';
import fetchFeedback from '../../hooks/useFeedback/api/fetchFeedback';
import { useFeedback } from '../../hooks/useFeedback/useFeedback';
import { fetchFeedbackComments } from '../../hooks/useFeedbackComments/api/fetchFeedbackComments';
import { useFeedbackComments } from '../../hooks/useFeedbackComments/useFeedbackComments';
import { Feedback as FeedbackType, FeedbackComment } from '../../types/feedback';
import AddComment from './components/AddCommentForm';
import Comment from './components/Comment';
interface Props {
	feedback: FeedbackType;
	comments: FeedbackComment[];
}

export default function Feedback({
	feedback: initialFeedback,
	comments: initialComments,
}: Props) {
	const { id } = initialFeedback;
	const { data: feedback } = useFeedback({ id, initialValue: initialFeedback });

	const { data: comments } = useFeedbackComments({
		feedbackId: feedback.id,
		initialValue: initialComments,
	});
	const commentCount = comments.length;

	return (
		<Container>
			<Header>
				<GoBackLink />
				<Link href={`${routes.editFeedback}/${id}`}>
					<Button $color='blue-dark'>Edit Feedback</Button>
				</Link>
			</Header>

			<FeedbackCard feedback={feedback} />

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

			<AddComment feedback={feedback} />
		</Container>
	);
}

const Container = styled.div`
	${contentStyles}
	max-width: 700px;
	display: grid;
	gap: 3rem;
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

	const feedback = await fetchFeedback(id as string);
	const comments = await fetchFeedbackComments(id as string);

	return {
		props: {
			feedback,
			comments,
		},
	};
}
