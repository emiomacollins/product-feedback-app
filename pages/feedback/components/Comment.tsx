import styled from 'styled-components';
import Button from '../../../components/Button';
import { Grid } from '../../../components/styled-components/Grid';
import { Breakpoints } from '../../../constants/breakpoints';
import { FeedbackComment } from '../../../types/feedback';

interface Props {
	comment: FeedbackComment;
}

export default function Comment({ comment }: Props) {
	const { text, user } = comment;
	const { fullName, photoUrl, username } = user;

	return (
		<Container>
			<ProfilePic src={photoUrl} alt='' />
			<Grid gap={0}>
				<Name>{fullName}</Name>
				<Username>@{username}</Username>
			</Grid>
			<ReplyBtn>Reply</ReplyBtn>
			<Text>{text}</Text>
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
