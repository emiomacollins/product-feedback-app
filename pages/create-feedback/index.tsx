import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import { Flex, flexStyles } from '../../components/styled-components/Flex';
import { Grid } from '../../components/styled-components/Grid';
import { Breakpoints } from '../../constants/breakpoints';
import { routes } from '../../constants/routes';
import { fetchFeedbacksKey } from '../../hooks/useFeedbacks/useFeedbacks';
import { Feedback, FeedbackCategory } from '../../types/feedback';
import createFeedback from './api';

interface Props {
	editing?: Feedback;
}

export default function CreateFeedback({ editing }: Props) {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutate: createFeedbackMutation, isLoading: creatingFeedback } = useMutation(
		'createFeedback',
		createFeedback,
		{
			onSuccess() {
				queryClient.invalidateQueries(fetchFeedbacksKey);
				router.push(routes.home);
			},
		}
	);

	return (
		<Container>
			<Link href={routes.home} passHref>
				<StyledLink color='gray'>
					<Flex>
						<StyledArrowIcon color='gray' /> <span>Go back</span>
					</Flex>
				</StyledLink>
			</Link>

			<Formik
				initialValues={{
					title: '',
					category: FeedbackCategory.feature,
					details: '',
				}}
				validateOnMount={true}
				onSubmit={(values) => {
					createFeedbackMutation(values);
				}}
				validationSchema={yup.object({
					title: yup.string().required('Can’t be empty'),
					details: yup.string().required('Can’t be empty'),
					category: yup.string().oneOf(Object.values(FeedbackCategory)),
				})}
			>
				{({ isValid }) => (
					<StyledForm>
						<Grid gap={5}>
							<Heading>Create New Feedback</Heading>

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

								<FormInput
									label='Feedback Detail'
									description='Include any specific comments on what should be improved, added, etc.'
								>
									<TextArea name='details' />
								</FormInput>
							</Grid>

							<Buttons>
								{/* For editing add delete here */}
								<Flex>
									<Link href={routes.home}>
										<Button $color='blue-dark'>Cancel</Button>
									</Link>

									<Button
										type='submit'
										isLoading={creatingFeedback}
										disabled={
											!isValid || creatingFeedback ? true : false
										}
									>
										Add Feedback
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

const Container = styled.div`
	${contentStyles}
	max-width: 600px;
	display: grid;
	gap: 4rem;
	min-height: 100vh;
	align-content: flex-start;
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
	justify-self: right;
	justify-content: space-between;
`;
