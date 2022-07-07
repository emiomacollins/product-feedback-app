import styled from 'styled-components';
import Button from '../../../components/Button';
import { Breakpoints } from '../../../constants/breakpoints';
import { FeedbackComment } from '../../../types/feedback';

interface Props {
	comment: FeedbackComment;
}

export default function Comment({ comment }: Props) {
	const { text, user } = comment;
	const { name, picture } = user;

	return (
		<Container>
			<ProfilePic src={picture} alt='' />
			<Name>{name}</Name>
			<ReplyBtn>Reply</ReplyBtn>
			<Text>{text}</Text>
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	gap: 1rem 2rem;
	grid-template-columns: auto 1fr auto;
	align-items: center;
	padding-block: 3rem;

	&:not(:last-child) {
		border-bottom: 1.5px solid var(--black-transparent-100);
	}

	@media ${Breakpoints.tabletUp} {
		gap: 0 2rem;
	}
`;

const Name = styled.p`
	color: var(--blue-dark);
	font-weight: 600;
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
