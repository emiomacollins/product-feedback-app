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
import { fetchFeedbackKey } from '../../../hooks/useFeedback/useFeedback';
import { Feedback } from '../../../types/feedback';
import { addComment, AddCommentProps } from '../api/addComment';

interface Props {
	feedback: Feedback;
}

export default function AddComment({ feedback }: Props) {
	const queryClient = useQueryClient();

	const {
		mutate: addCommentMutation,
		error: addCommentError,
		isLoading: addingComment,
	} = useMutation<void, Error, AddCommentProps>('addComment', addComment, {
		onSuccess() {
			queryClient.invalidateQueries(fetchFeedbackKey);
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
			onSubmit={(values, { resetForm }) => {
				addCommentMutation({ ...values, feedbackId: feedback.id });
				resetForm();
			}}
		>
			{({ values: { text } }) => {
				const charactersLeft = 250 - text.length;
				return (
					<Container>
						<Grid gap={2}>
							<Heading>Add a comment</Heading>

							<TextArea
								name='text'
								rows={3}
								placeholder='Great feedback!'
							/>

							{addCommentError && (
								<ErrorMessage>{addCommentError.message}</ErrorMessage>
							)}

							<StyledFlex>
								<p>
									{charactersLeft < 0 ? 0 : charactersLeft} Character
									{charactersLeft !== 1 && 's'} left
								</p>
								<Button
									type='submit'
									disabled={addingComment}
									isLoading={addingComment}
								>
									Post Comment
								</Button>
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
