import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import * as yup from 'yup';
import Button from '../../../components/Button';
import TextArea from '../../../components/formik/TextArea';
import { ErrorMessage } from '../../../components/styled-components/ErrorMessage';
import { Grid } from '../../../components/styled-components/Grid';
import WithUser from '../../../components/WithUser/WithUser';
import { Breakpoints } from '../../../constants/breakpoints';
import { useAuth } from '../../../hooks/useAuth';
import { fetchFeedbackCommentsKey } from '../../../hooks/useFeedbackComments/useFeedbackComments';
import useToggle from '../../../hooks/useToggle';
import { FeedbackComment, FeedbackCommentReply } from '../../../types/feedback';
import replyComment from '../api/replyComment';

interface Props {
	commentId?: string;
	comment?: FeedbackComment;
	reply?: FeedbackCommentReply;
}

export default function Comment({ comment, reply, commentId, ...props }: Props) {
	const queryClient = useQueryClient();
	const router = useRouter();
	const replyRef = useRef<HTMLTextAreaElement | null>(null);

	const {
		expanded: replyExpanded,
		toggle: toggleReplyExpanded,
		setExpanded,
	} = useToggle();

	const {
		username: currentUserUsername,
		photoUrl: currentUserPhotoUrl,
		fullName: currentUserFullname,
	} = useAuth();

	const { text, user } = comment || reply || {};
	const { fullName, photoUrl, username } = user || {};
	const hasTag = reply?.text.startsWith('@');
	const taggedUsername = hasTag ? text?.split(' ')[0] : '';
	const restOfText = hasTag ? text?.split(' ').slice(1) : text;

	const {
		mutate: replyCommentMutation,
		error,
		isLoading: replyingComment,
	} = useMutation('replyComment', replyComment, {
		onError(err: Error) {},
		onSuccess() {
			queryClient.invalidateQueries(fetchFeedbackCommentsKey);
			setExpanded(false);
		},
	});

	useEffect(() => {
		replyExpanded && replyRef.current?.focus();
	}, [replyExpanded]);

	return (
		<Container {...props}>
			<ProfilePic src={photoUrl} alt='' />

			<Grid gap={0}>
				<Name>{fullName}</Name>
				<Username>@{username}</Username>
			</Grid>

			{currentUserUsername !== username && (
				<WithUser
					onClick={toggleReplyExpanded}
					message='Sign in to reply a Comment'
				>
					<ReplyBtn>Reply</ReplyBtn>
				</WithUser>
			)}

			<Text>
				{taggedUsername && <TaggedUsername>{taggedUsername}</TaggedUsername>}{' '}
				{restOfText}
			</Text>

			{replyExpanded && (
				<Formik
					initialValues={{
						text: ``,
					}}
					validationSchema={yup.object({
						text: yup.string().min(5).max(250).required('required'),
					})}
					onSubmit={async ({ text }, { resetForm }) => {
						replyCommentMutation({
							feedbackId: router.query.id as string,
							commentId: comment?.id || (commentId as string),
							reply: {
								text: `@${username} ${text}`,
								user: {
									fullName: currentUserFullname,
									photoUrl: currentUserPhotoUrl,
									username: currentUserUsername,
								},
							},
						});
						resetForm();
					}}
				>
					<ReplyGrid>
						<TextArea
							ref={replyRef}
							placeholder='Reply...'
							name='text'
							rows={3}
						/>
						<Button
							type='submit'
							disabled={replyingComment}
							isLoading={replyingComment}
						>
							Post Reply
						</Button>
						{error && <ErrorMessage>{error.message}</ErrorMessage>}
					</ReplyGrid>
				</Formik>
			)}

			{comment?.replies && (
				<Replies>
					{comment.replies.map((reply) => (
						<Reply key={reply.text} reply={reply} commentId={comment.id} />
					))}
				</Replies>
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

const ReplyGrid = styled(Form)`
	grid-column: 1/-1;
	display: grid;
	gap: 2rem;
	grid-template-columns: 1fr auto;
	align-items: flex-start;

	@media ${Breakpoints.tabletUp} {
		grid-column: 2/-1;
	}
`;

const Replies = styled.div`
	grid-column: 1/-1;
	display: grid;
	gap: 2rem;

	@media ${Breakpoints.tabletUp} {
		grid-column: 2/-1;
	}
`;

const Reply = styled(Comment)`
	padding-block: 0;
	&:not(:last-child) {
		border-bottom: 0;
	}

	@media ${Breakpoints.tabletUp} {
		padding-block: 1rem;
	}
`;

const TaggedUsername = styled.span`
	font-weight: 800;
	color: var(--purple);
`;
