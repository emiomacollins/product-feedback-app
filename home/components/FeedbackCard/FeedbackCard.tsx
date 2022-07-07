import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import ArrowDownIcon from '../../../assets/svgs/custom/ArrowDownIcon';
import commentsIconPath from '../../../assets/svgs/icon-comments.svg';
import { Badge } from '../../../components/styled-components/Badge';
import { Card } from '../../../components/styled-components/Card';
import { Flex } from '../../../components/styled-components/Flex';
import { gridStyles } from '../../../components/styled-components/Grid';
import { Breakpoints } from '../../../constants/breakpoints';
import { routes } from '../../../constants/routes';
import { useAuth } from '../../../hooks/useAuth';
import { fetchFeedbackKey } from '../../../hooks/useFeedback/useFeedback';
import {
	fetchFeedbacksKey,
	useFeedbacks,
} from '../../../hooks/useFeedbacks/useFeedbacks';
import { Feedback } from '../../../types/feedback';
import toggleUpvote from './api';

interface Props {
	feedback: Feedback;
}

export default function FeedbackCard({ feedback }: Props) {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const { title, upVotes, commentCount, category, details, id } = feedback;
	const upVoted = user?.uid ? upVotes[user?.uid] : false;

	const upVoteCount = useMemo(() => {
		return Object.keys(upVotes).length;
	}, [upVotes]);

	const {
		fetchFeedbacksQuery: { isLoading: loadingFeedbacks },
	} = useFeedbacks();

	const { mutate: toggleUpvoteMutation, isLoading: togglingUpvote } = useMutation(
		'toggleUpvote',
		toggleUpvote,
		{
			onSuccess() {
				queryClient.invalidateQueries(fetchFeedbacksKey);
				queryClient.invalidateQueries(fetchFeedbackKey);
			},
		}
	);

	return (
		<Container>
			<Link href={`${routes.feedback}/${id}`} passHref>
				<Info>
					<Title>{title}</Title>
					<p>{details}</p>
					<Badge plain as={'div'}>
						{category}
					</Badge>
				</Info>
			</Link>

			<Upvote
				onClick={() => toggleUpvoteMutation(id)}
				disabled={togglingUpvote || loadingFeedbacks}
				$active={upVoted}
			>
				<UpvoteIcon color={upVoted ? 'white' : 'blue'} />
				<h4>{upVoteCount}</h4>
			</Upvote>

			<Comments>
				<Image src={commentsIconPath} alt='' />
				<h4>{commentCount}</h4>
			</Comments>
		</Container>
	);
}

const Container = styled(Card)`
	display: grid;
	color: var(--gray);
	gap: 2rem 4rem;
	grid-template-columns: 1fr auto;

	@media ${Breakpoints.tabletUp} {
		grid-template-columns: auto 1fr auto;
	}
`;

const Title = styled.h3`
	color: var(--blue-dark);
	transition: all 0.2s;
`;

const Info = styled.a`
	${gridStyles}
	justify-items: left;
	order: 1;
	grid-column: 1/-1;
	text-decoration: none;
	color: var(--gray);

	&:hover,
	&:focus {
		${Title} {
			color: var(--blue);
		}
		outline-color: var(--blue);
	}

	@media ${Breakpoints.tabletUp} {
		order: 2;
		grid-column: unset;
	}
`;

const UpvoteIcon = styled(ArrowDownIcon)`
	transform: rotate(180deg);
`;

const Upvote = styled(Badge)`
	width: 5rem;
	min-width: max-content;
	color: var(--${(p) => (p.$active ? 'white' : 'blue-dark')});
	justify-items: center;
	gap: 0.8rem;
	padding: 1rem;
	order: 2;
	display: flex;
	align-items: center;

	@media ${Breakpoints.tabletUp} {
		order: 1;
		display: grid;
		align-self: flex-start;
		padding: 1.5rem 1rem;
	}
`;

const Comments = styled(Flex)`
	color: var(--blue-dark);
	order: 3;
`;
