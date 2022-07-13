import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled, { css } from 'styled-components';
import * as yup from 'yup';
import deleteIconPath from '../../../assets/svgs/delete-icon.svg';
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
	const { comment, reply, commentId, ...restProps } = props;
	const queryClient = useQueryClient();
	const router = useRouter();
	const replyInputRef = useRef<HTMLTextAreaElement | null>(null);
	const repliesRef = useRef<HTMLDivElement | null>(null);
	const textRef = useRef<HTMLParagraphElement | null>(null);
	const [textHeight, setTextHeight] = useState(0);
	const [repliesHeight, setRepliesHeight] = useState(0);

	const {
		expanded: replyExpanded,
		toggle: toggleReplyExpanded,
		setExpanded,
	} = useToggle();

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
				// let invalidateQueries update fetchFeedback & fetchFeedbacks
				queryClient.cancelQueries(fetchFeedbackCommentsKey);
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
				queryClient.invalidateQueries(fetchFeedbackCommentsKey);
				queryClient.invalidateQueries(fetchFeedbackKey);
				queryClient.invalidateQueries(fetchFeedbacksKey);
			},
		}
	);

	const updateHeights = () => {
		setRepliesHeight(repliesRef.current?.clientHeight || 0);
		setTextHeight(textRef.current?.clientHeight || 0);
	};

	useEffect(() => {
		replyExpanded && replyInputRef.current?.focus();
	}, [replyExpanded]);

	useEffect(() => {
		updateHeights();
	}, [replyExpanded, props]);

	useEffect(() => {
		window.addEventListener('resize', updateHeights);
		return () => window.removeEventListener('resize', updateHeights);
	}, []);

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
					<DeleteIcon src={deleteIconPath.src} alt='' />
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
				<Replies
					ref={repliesRef as any}
					repliesHeight={repliesHeight}
					textHeight={textHeight}
				>
					<Line />
					{comment.replies.map((reply) => (
						<Reply key={reply.text} reply={reply} commentId={comment.id} />
					))}
				</Replies>
			)}
		</Container>
	);
}

const Container = styled.div`
	--profile-pic-size: 4rem;
	--line-width: 1.2px;
	display: grid;
	gap: 1.5rem 2rem;
	grid-template-columns: auto 1fr auto;
	align-items: center;
	padding-block: 3rem;
	position: relative;

	&:not(:last-child) {
		border-bottom: var(--line-width) solid var(--black-transparent-100);
	}
`;

const Line = styled.div`
	position: absolute;
	width: var(--line-width);
	background: var(--black-transparent-100);
	height: calc(var(--replies-height) - 5rem);

	@media ${Breakpoints.tabletUp} {
		height: calc(var(--replies-height) + var(--text-height));
		top: calc(var(--profile-pic-size) + 4rem);
		left: calc(var(--profile-pic-size) / 2);
	}
`;

const Name = styled.p`
	color: var(--blue-dark);
	font-weight: 800;
	text-transform: capitalize;
	/* white-space: nowrap; */
`;

const Username = styled.p`
	font-size: var(--size-350);
	line-height: 1;
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

	&:hover {
		opacity: 0.6;
	}

	&:focus {
		outline-color: var(--blue);
	}
`;

const DeleteIcon = styled.img`
	width: var(--size-700);
	aspect-ratio: 1;
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
	align-items: flex-start;

	@media ${Breakpoints.tabletUp} {
		grid-column: 2/-1;
		grid-template-columns: 1fr auto;
	}
`;

interface RepliesProps {
	repliesHeight: number;
	textHeight: number;
}

const Replies = styled.div<RepliesProps>`
	--replies-height: ${(p) => p.repliesHeight}px;
	--text-height: ${(p) => p.textHeight}px;

	grid-column: 1/-1;
	display: grid;
	gap: 2rem;

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
