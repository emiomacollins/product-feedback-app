import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled, { css } from 'styled-components';
import * as yup from 'yup';
import TrashIcon from '../../../assets/svgs/custom/TrashIcon';
import Button from '../../../components/Button';
import TextArea from '../../../components/formik/TextArea';
import { ErrorMessage } from '../../../components/styled-components/ErrorMessage';
import { Grid } from '../../../components/styled-components/Grid';
import WithUser from '../../../components/WithUser/WithUser';
import { Breakpoints } from '../../../constants/breakpoints';
import { useAuth } from '../../../hooks/useAuth';
import { fetchFeedbackKey } from '../../../hooks/useFeedback/useFeedback';
import { fetchFeedbackCommentsKey } from '../../../hooks/useFeedbackComments/useFeedbackComments';
import { fetchFeedbacksKey } from '../../../hooks/useFeedbacks/useFeedbacks';
import useToggle from '../../../hooks/useToggle';
import { FeedbackComment, FeedbackCommentReply } from '../../../types/feedback';
import deleteComment from '../api/deleteComment';
import replyComment from '../api/replyComment';

interface Props {
	commentId?: string;
	comment?: FeedbackComment;
	reply?: FeedbackCommentReply;
}

export default function Comment(props: Props) {
	const queryClient = useQueryClient();
	const router = useRouter();
	const [textHeight, setTextHeight] = useState(0);
	const { comment, reply, commentId, ...restProps } = props;
	const { expanded: replyExpanded, toggle: toggleReplyExpanded } = useToggle();
	const replyInputRef = useRef<HTMLTextAreaElement | null>(null);
	const textRef = useRef<HTMLParagraphElement | null>(null);

	const {
		username: currentUserUsername,
		photoUrl: currentUserPhotoUrl,
		fullName: currentUserFullname,
		user: currentUser,
	} = useAuth();

	const { text, user } = comment || reply || {};
	const { fullName, photoUrl, username } = user || {};
	const hasTag = reply?.text.startsWith('@');
	const taggedUsername = hasTag ? text?.split(' ')[0] : '';
	const restOfText = hasTag ? text?.split(' ').slice(1).join(' ') : text;

	const {
		mutate: replyCommentMutation,
		error,
		isLoading: replyingComment,
	} = useMutation('replyComment', replyComment, {
		onError(err: Error) {},
		onSuccess() {
			queryClient.invalidateQueries(fetchFeedbackCommentsKey);
		},
	});

	const { mutate: deleteCommentMutation, error: deleteError } = useMutation(
		'deleteComment',
		deleteComment,
		{
			onMutate({ commentId }) {
				let prevComments;

				queryClient.setQueriesData(
					fetchFeedbackCommentsKey,
					(prev: FeedbackComment[] | undefined) => {
						prevComments = prev;
						return prev?.filter(({ id }) => id !== commentId) || [];
					}
				);

				return { prevComments };
			},

			onError(err: Error, _, context) {
				queryClient.setQueriesData(
					fetchFeedbackCommentsKey,
					context?.prevComments
				);
			},

			onSettled() {
				// queryClient.invalidateQueries(fetchFeedbackCommentsKey); // disrupts ux when deleting multiple comments
				queryClient.invalidateQueries(fetchFeedbackKey);
				queryClient.invalidateQueries(fetchFeedbacksKey);
			},
		}
	);

	useEffect(() => {
		replyExpanded && replyInputRef.current?.focus();
	}, [replyExpanded]);

	useEffect(() => {
		const rowGap = 20;
		const textHeight = textRef.current?.clientHeight || 0;
		const replyInputHeight = replyInputRef.current?.clientHeight || 0;
		setTextHeight(textHeight + (replyInputHeight ? replyInputHeight + rowGap : 0));
	}, [replyExpanded]);

	return (
		<Container {...restProps}>
			<ProfilePic src={photoUrl} alt='' />

			<Grid gap={0}>
				<Name>{fullName}</Name>
				<Username>@{username}</Username>
			</Grid>

			{currentUserUsername !== username ? (
				<WithUser
					onClick={toggleReplyExpanded}
					message='Sign in to reply a Comment'
				>
					<ReplyButton>Reply</ReplyButton>
				</WithUser>
			) : comment ? (
				<DeleteBtn
					onClick={() =>
						deleteCommentMutation({
							commentId: comment?.id,
							feedbackId: router.query.id as string,
						})
					}
				>
					<TrashIcon />
				</DeleteBtn>
			) : null}

			<Text ref={textRef as any}>
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
									uid: currentUser?.uid as string,
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
							ref={replyInputRef}
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

			{comment && comment.replies.length > 0 && (
				<Replies>
					<Line textHeight={textHeight} />
					{comment.replies.map((reply, i) => (
						<Reply
							key={reply.text + i}
							reply={reply}
							commentId={comment.id}
						/>
					))}
				</Replies>
			)}
		</Container>
	);
}

const Container = styled.div`
	--profile-pic-size: 4rem;
	--line-width: 1.2px;
	--padding: 3rem;
	--row-gap: 1.5rem;

	display: grid;
	gap: var(--row-gap) 2rem;
	grid-template-columns: auto 1fr auto;
	align-items: center;
	padding-block: var(--padding);
	position: relative;

	&:not(:last-child) {
		border-bottom: var(--line-width) solid var(--black-transparent-100);
	}
`;

interface LineProps {
	textHeight: number;
}

const Line = styled.div<LineProps>`
	--text-height: ${(p) => p.textHeight}px;
	position: absolute;
	width: var(--line-width);
	background: var(--black-transparent-100);
	height: 90%;

	@media ${Breakpoints.tabletUp} {
		height: calc(90% + var(--text-height));
		left: calc(-1 * var(--profile-pic-size));
		transform: translateY(calc(-1 * (var(--text-height) + var(--row-gap))));
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

	.darkmode & {
		opacity: 0.6;
	}
`;

const ProfilePic = styled.img`
	border-radius: 100%;
	width: var(--profile-pic-size);
	min-width: var(--profile-pic-size);
	aspect-ratio: 1;
	object-position: top;
	object-fit: cover;
`;

const IconStyles = css`
	padding: 1rem;
	margin-top: -1rem;

	&&:focus {
		outline-color: var(--blue);
	}
`;

const ReplyButton = styled(Button)`
	${IconStyles}
	color: var(--blue);
	background: var(--transparent);
	transition: all 0s;
	font-size: var(--size-350);

	&:hover {
		text-decoration: underline;
	}
`;

const DeleteBtn = styled.button`
	${IconStyles}
	transition: all 0.2s;
	display: flex;
	padding: 0;

	&:hover {
		opacity: 0.6;
	}
`;

const Text = styled.p`
	grid-column: 1/-1;
	position: relative;

	@media ${Breakpoints.tabletUp} {
		grid-column: 2/-2;
	}
`;

const ReplyGrid = styled(Form)`
	grid-column: 1/-1;
	display: grid;
	gap: 2rem;
	align-items: flex-start;

	@media ${Breakpoints.tabletUp} {
		grid-column: 2/-1;
		grid-template-columns: 1fr auto;
	}
`;

const Replies = styled.div`
	grid-column: 1/-1;
	display: grid;
	gap: 2rem;
	position: relative; // for Line

	@media ${Breakpoints.tabletUp} {
		grid-column: 2/-1;
	}
`;

const Reply = styled(Comment)`
	padding-block: 0.5rem;
	padding-left: 2.5rem;
	&:not(:last-child) {
		border-bottom: 0;
	}

	@media ${Breakpoints.tabletUp} {
		padding-block: 1rem;
		padding-left: 0rem;
	}
`;

const TaggedUsername = styled.span`
	font-weight: 800;
	color: var(--purple);
`;
