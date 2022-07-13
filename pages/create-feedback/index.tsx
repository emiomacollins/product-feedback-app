import { Form, Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled, { css } from 'styled-components';
import * as yup from 'yup';
import editFeedbackIconPath from '../../assets/svgs/icon-edit-feedback.svg';
import newFeedbackIconPath from '../../assets/svgs/icon-new-feedback.svg';
import Button from '../../components/Button';
import GoBackLink from '../../components/curried/GoBackLink';
import Select from '../../components/formik/Select';
import TextArea from '../../components/formik/TextArea';
import Textbox from '../../components/formik/Textbox';
import FormInput from '../../components/FormInput';
import { cardStyles } from '../../components/styled-components/Card';
import { contentStyles } from '../../components/styled-components/Content';
import { ErrorMessage } from '../../components/styled-components/ErrorMessage';
import { Grid } from '../../components/styled-components/Grid';
import { Breakpoints } from '../../constants/breakpoints';
import { routes } from '../../constants/routes';
import { fetchFeedbacksKey } from '../../hooks/useFeedbacks/useFeedbacks';
import { Feedback, FeedbackCategory, FeedbackStatus } from '../../types/feedback';
import deleteFeedback from '../edit-feedback/api/deleteFeedback';
import updateFeedback from '../edit-feedback/api/updateFeedback';
import createFeedback, { CreateFeedbackProps } from './api';
interface Props {
	editing?: Feedback;
}

export default function CreateFeedback({ editing }: Props) {
	const queryClient = useQueryClient();
	const router = useRouter();
	const [success, setSuccess] = useState(false);

	const {
		mutate: submitMutation,
		isLoading: submittingFeedback,
		error: submitError,
	} = useMutation<void, Error, Feedback | CreateFeedbackProps>(
		'create/update Feedback',
		(props) =>
			editing
				? updateFeedback(props as Feedback)
				: createFeedback(props as CreateFeedbackProps),
		{
			onSuccess() {
				queryClient.invalidateQueries(fetchFeedbacksKey);
				setSuccess(true);

				editing
					? router.push(`${routes.feedback}/${editing.id}`)
					: router.push(routes.home);
			},
		}
	);

	const {
		mutate: deleteMutation,
		isLoading: deletingFeedback,
		error: deleteError,
	} = useMutation<void, Error, string>('deleteFeedback', deleteFeedback, {
		onSuccess() {
			queryClient.invalidateQueries(fetchFeedbacksKey);
			setSuccess(true);
			router.push(routes.home);
		},
	});

	// todo: add popup for delete feedback btn

	return (
		<Container success={success}>
			<GoBackLink />

			<Formik
				initialValues={{
					title: editing?.title || '',
					details: editing?.details || '',
					category: editing?.category || FeedbackCategory.feature,
					...(editing
						? {
								status: editing.status,
						  }
						: {}),
				}}
				validationSchema={yup.object({
					title: yup.string().min(3).max(25).required('Can’t be empty'),
					details: yup.string().required('Can’t be empty'),
					category: yup.string().oneOf(Object.values(FeedbackCategory)),
					...(editing
						? {
								status: yup.string().oneOf(Object.values(FeedbackStatus)),
						  }
						: {}),
				})}
				validateOnMount={true}
				onSubmit={(values) => {
					submitMutation(editing ? { ...editing, ...values } : values);
				}}
			>
				{({ values: { category, status } }) => (
					<StyledForm>
						<Icon>
							<Image
								src={editing ? editFeedbackIconPath : newFeedbackIconPath}
								alt=''
							/>
						</Icon>

						<Grid gap={5}>
							<Heading>
								{editing
									? `Editing '${editing.title}'`
									: `Create New Feedback`}
							</Heading>

							<Grid gap={3}>
								<FormInput
									label='Feedback Title'
									description='Add a short, descriptive headline'
								>
									<Textbox name='title' type='text' />
								</FormInput>

								<FormInput
									label='Category'
									description='Choose a category for your feedback'
								>
									<Select
										name='category'
										selected={{
											label: category,
											value: category,
										}}
										options={Object.values(FeedbackCategory).map(
											(category) => ({
												label: category,
												value: category,
											})
										)}
									/>
								</FormInput>

								{editing && (
									<FormInput
										label='Update Status'
										description='Change feedback state'
									>
										<Select
											name='status'
											selected={{
												label: status || '',
												value: status,
											}}
											options={Object.values(FeedbackStatus).map(
												(status) => ({
													label: status,
													value: status,
												})
											)}
										/>
									</FormInput>
								)}

								<FormInput
									label='Feedback Detail'
									description='Include any specific comments on what should be improved, added, etc.'
								>
									<TextArea name='details' />
								</FormInput>

								{submitError && (
									<ErrorMessage>{submitError.message}</ErrorMessage>
								)}

								{deleteError && (
									<ErrorMessage>{deleteError.message}</ErrorMessage>
								)}
							</Grid>

							<Buttons editing={editing ? true : false}>
								{editing && (
									<Button
										$color='red'
										type='button'
										isLoading={deletingFeedback}
										onClick={() => deleteMutation(editing.id)}
									>
										Delete
									</Button>
								)}

								<Link href={`${routes.feedback}/${editing?.id}`}>
									<Button $color='blue-dark' type='button'>
										Cancel
									</Button>
								</Link>

								<Button type='submit' isLoading={submittingFeedback}>
									{editing ? 'Save Changes' : 'Add Feedback'}
								</Button>
							</Buttons>
						</Grid>
					</StyledForm>
				)}
			</Formik>
		</Container>
	);
}

interface ContainerProps {
	success: boolean;
}

const Container = styled.div<ContainerProps>`
	${contentStyles}
	max-width: 450px;
	display: grid;
	gap: 4rem;
	min-height: 100vh;
	align-content: flex-start;
	opacity: ${(p) => (p.success ? 0 : 1)};
	transition: all 0.2s;

	@media ${Breakpoints.tabletUp} {
		max-width: 600px;
	}
`;

const StyledForm = styled(Form)`
	${cardStyles}
	padding: 5rem 2.5rem;
	position: relative;

	@media ${Breakpoints.tabletUp} {
		padding-inline: 4rem;
	}
`;

const Heading = styled.h1`
	color: var(--blue-dark);
`;

interface IsEditingProps {
	editing: boolean;
}

const Buttons = styled.div<IsEditingProps>`
	display: grid;
	gap: 1rem 2rem;

	@media ${Breakpoints.tabletUp} {
		grid-template-columns: auto auto;
		justify-content: right;

		${(p) =>
			p.editing &&
			css`
				grid-template-columns: 1fr auto auto;
				justify-items: left;
			`};
	}
`;

const Icon = styled.div`
	position: absolute;
	top: 0;
	left: 5%;
	width: clamp(3.5rem, 3vw, 5rem);
	transform: translateY(-40%);
`;
