import styled from 'styled-components';
import Button from '../../../components/Button';
import { Grid } from '../../../components/styled-components/Grid';
import { Textbox } from '../../../components/styled-components/Textbox';
import { Breakpoints } from '../../../constants/breakpoints';
import useToggle from '../../../hooks/useToggle';
import { FeedbackComment } from '../../../types/feedback';

interface Props {
	comment: FeedbackComment;
	isReply?: boolean;
}

export default function Comment({ comment, isReply }: Props) {
	const { text, user } = comment;
	const { fullName, photoUrl, username } = user;
	const { expanded: replyExpanded, toggle: toggleReplyExpanded } = useToggle();
	// isReply

	return (
		<Container>
			<ProfilePic src={photoUrl} alt='' />

			<Grid gap={0}>
				<Name>{fullName}</Name>
				<Username>@{username}</Username>
			</Grid>

			<ReplyBtn onClick={toggleReplyExpanded}>Reply</ReplyBtn>

			<Text>{text}</Text>

			{replyExpanded && (
				<ReplyGrid>
					<Textbox as='textarea' placeholder='Reply...' />
					<Button>Post Reply</Button>
				</ReplyGrid>
			)}
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	gap: 2rem;
	grid-template-columns: auto 1fr auto;
	align-items: center;
	padding-block: 3rem;

	&:not(:last-child) {
		border-bottom: 1.5px solid var(--black-transparent-100);
	}
`;

const Name = styled.p`
	color: var(--blue-dark);
	font-weight: 800;
	text-transform: capitalize;
`;

const Username = styled.p`
	font-size: var(--size-350);
	line-height: 1;
`;

const ProfilePic = styled.img`
	border-radius: 100%;
	width: 4rem;
	aspect-ratio: 1;
	object-position: top;
	object-fit: cover;
`;

const ReplyBtn = styled(Button)`
	padding: 0 1rem;
	color: var(--blue);
	background: var(--transparent);

	&:hover {
		text-decoration: underline;
	}
`;

const Text = styled.p`
	grid-column: 1/-1;

	@media ${Breakpoints.tabletUp} {
		grid-column: 2/-2;
	}
`;

const ReplyGrid = styled.div`
	grid-column: 1/-1;
	display: grid;
	gap: 2rem;
	grid-template-columns: 1fr auto;
	align-items: flex-start;

	@media ${Breakpoints.tabletUp} {
		grid-column: 2/-1;
	}
`;
