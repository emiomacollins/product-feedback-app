import { collection, getDocs, query, where } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import styled from 'styled-components';
import Button from '../../components/Button';
import GoBackLink from '../../components/curried/GoBackLink';
import { Card, cardStyles } from '../../components/styled-components/Card';
import { contentStyles } from '../../components/styled-components/Content';
import { flexStyles } from '../../components/styled-components/Flex';
import { routes } from '../../constants/routes';
import FeedbackCard from '../../home/components/FeedbackCard/FeedbackCard';
import { db } from '../../lib/firebase';
import { Feedback as FeedbackType, FeedbackComment } from '../../types/feedback';
import fetchFeedback from '../edit-feedback/api/fetchFeedback';

interface Props {
	feedback: FeedbackType;
	comments: FeedbackComment[];
}

export default function Feedback({ feedback, comments }: Props) {
	const { id } = feedback;
	// add useQuery for fetchFeedback to invalidate on upvote toggle

	return (
		<Container>
			<Header>
				<GoBackLink />
				<Link href={`${routes.editFeedback}/${id}`}>
					<Button $color='blue-dark'>Edit Feedback</Button>
				</Link>
			</Header>

			<FeedbackCard feedback={feedback} />
		</Container>
	);
}

const Container = styled.div`
	${contentStyles}
	max-width: 800px;
	display: grid;
	gap: 3rem;
`;

const Header = styled.div`
	${flexStyles}
	justify-content: space-between;
`;

const Comments = styled(Card)``;

const AddCommentForm = styled.form`
	${cardStyles}
`;

export async function getServerSideProps(props: GetServerSidePropsContext) {
	const { query: pathQuery } = props;
	const { id } = pathQuery;

	const feedback = await fetchFeedback(id as string);
	const { commentIds } = feedback;

	const commentsRef = collection(db, `comments`);
	const commentsQuery = commentIds.length
		? query(commentsRef, where('id', 'in', commentIds))
		: commentsRef;

	const comments = await (await getDocs(commentsQuery)).docs.map((doc) => doc.data());

	return {
		props: {
			feedback,
			comments,
		},
	};
}
