import { Form, Formik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import * as yup from 'yup';
import Button from '../../../components/Button';
import TextArea from '../../../components/formik/TextArea';
import { cardStyles } from '../../../components/styled-components/Card';
import { ErrorMessage } from '../../../components/styled-components/ErrorMessage';
import { flexStyles } from '../../../components/styled-components/Flex';
import { Grid } from '../../../components/styled-components/Grid';
import WithUser from '../../../components/WithUser/WithUser';
import { useAuth } from '../../../hooks/useAuth';
import { fetchFeedbackKey } from '../../../hooks/useFeedback/useFeedback';
import { fetchFeedbackCommentsKey } from '../../../hooks/useFeedbackComments/useFeedbackComments';
import { fetchFeedbacksKey } from '../../../hooks/useFeedbacks/useFeedbacks';
import { Feedback } from '../../../types/feedback';
import addComment from '../api/addComment';

interface Props {
	feedback: Feedback;
}

export default function AddComment({ feedback }: Props) {
	const queryClient = useQueryClient();
	const { fullName, photoUrl, username } = useAuth();

	const {
		mutate: addCommentMutation,
		error,
		isLoading,
	} = useMutation('addComment', addComment, {
		onError(err: Error) {},
		onSuccess() {
			queryClient.invalidateQueries(fetchFeedbackKey);
			queryClient.invalidateQueries(fetchFeedbacksKey); // initialData does not replace an existing cache data
			queryClient.invalidateQueries(fetchFeedbackCommentsKey);
		},
	});

	return (
		<Formik
			initialValues={{
				text: '',
			}}
			validationSchema={yup.object({
				text: yup.string().min(5).max(250).required('required'),
			})}
			onSubmit={async (values, { resetForm }) => {
				const { text } = values;
				addCommentMutation({
					feedbackId: feedback.id,
					comment: {
						text,
						user: {
							fullName,
							photoUrl,
							username,
						},
					},
				});
				resetForm();
			}}
		>
			{({ values: { text }, submitForm }) => {
				const charactersLeft = 250 - text.length;
				return (
					<Container>
						<Grid gap={2}>
							<Heading>Add a comment</Heading>

							<TextArea name='text' rows={3} placeholder='Nice feedback!' />

							{error && <ErrorMessage>{error.message}</ErrorMessage>}

							<StyledFlex $wrap>
								<p>
									{charactersLeft < 0 ? 0 : charactersLeft} Character
									{charactersLeft !== 1 && 's'} left
								</p>
								<WithUser
									onClick={submitForm}
									message='Sign in to post a Comment'
								>
									<Button
										type='button'
										disabled={isLoading}
										isLoading={isLoading}
									>
										Post Comment
									</Button>
								</WithUser>
							</StyledFlex>
						</Grid>
					</Container>
				);
			}}
		</Formik>
	);
}

const Container = styled(Form)`
	${cardStyles}
	padding-block: 2.5rem;
	margin-bottom: 2rem;
`;

const Heading = styled.h3`
	color: var(--blue-dark);
`;

const StyledFlex = styled.div`
	${flexStyles}
	justify-content: space-between;
`;
