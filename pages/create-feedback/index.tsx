import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import * as yup from 'yup';
import ArrowDownIcon from '../../assets/svgs/custom/ArrowDownIcon';
import Button from '../../components/Button';
import Select from '../../components/formik/Select';
import TextArea from '../../components/formik/TextArea';
import Textbox from '../../components/formik/Textbox';
import FormInput from '../../components/FormInput';
import { BoldLink } from '../../components/styled-components/BoldLink';
import { cardStyles } from '../../components/styled-components/Card';
import { contentStyles } from '../../components/styled-components/Content';
import { ErrorMessage } from '../../components/styled-components/ErrorMessage';
import { Flex, flexStyles } from '../../components/styled-components/Flex';
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
				router.push(routes.home);
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

	return (
		<Container success={success}>
			<Link href={routes.home} passHref>
				<StyledLink color='gray'>
					<Flex>
						<StyledArrowIcon color='gray' /> <span>Go back</span>
					</Flex>
				</StyledLink>
			</Link>

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
					title: yup.string().required('Can’t be empty'),
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
				{({ isValid }) => (
					<StyledForm>
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
										initialValue={{
											label: FeedbackCategory.feature,
											value: FeedbackCategory.feature,
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
											initialValue={{
												label: editing.status,
												value: editing.status,
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

							<Buttons>
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
								<Flex>
									<Link href={routes.home}>
										<Button $color='blue-dark' type='button'>
											Cancel
										</Button>
									</Link>

									<Button
										type='submit'
										isLoading={submittingFeedback}
										disabled={!isValid ? true : false}
									>
										{editing ? 'Save Changes' : 'Add Feedback'}
									</Button>
								</Flex>
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
	max-width: 600px;
	display: grid;
	gap: 4rem;
	min-height: 100vh;
	align-content: flex-start;
	opacity: ${(p) => (p.success ? 0 : 1)};
	transition: all 0.2s;
`;

const StyledLink = styled(BoldLink)`
	padding-block: 1rem;
	text-decoration: none;
	justify-self: left;
`;

const StyledArrowIcon = styled(ArrowDownIcon)`
	transform: rotate(90deg);
`;

const StyledForm = styled(Form)`
	${cardStyles}
	padding: 2rem 2.5rem;

	@media ${Breakpoints.tabletUp} {
		padding: 4rem 3rem;
	}
`;

const Heading = styled.h2`
	color: var(--blue-dark);
`;

const Buttons = styled.div`
	${flexStyles}
	justify-content: space-between;
	flex-wrap: wrap;
`;
