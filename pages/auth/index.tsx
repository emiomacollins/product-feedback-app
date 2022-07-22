import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import styled, { css } from 'styled-components';
import * as yup from 'yup';
import Button from '../../components/Button';
import GoBackLink from '../../components/curried/GoBackLink';
import Textbox from '../../components/formik/Textbox';
import FormInput from '../../components/FormInput';
import { cardStyles } from '../../components/styled-components/Card';
import { contentStyles } from '../../components/styled-components/Content';
import { ErrorMessage } from '../../components/styled-components/ErrorMessage';
import { Flex } from '../../components/styled-components/Flex';
import { Grid, gridStyles } from '../../components/styled-components/Grid';
import { Breakpoints } from '../../constants/breakpoints';
import { routes } from '../../constants/routes';
import { auth, db } from '../../lib/firebase';
import verifyUsername from './api';

interface FormikValues {
	email: string;
	password: string;
	fullName?: string;
	username?: string;
	photoUrl?: { label: string; url: string };
}

enum AuthType {
	login = 'Login',
	signuUp = 'Sign Up',
}

export default function Auth() {
	const router = useRouter();
	const { type } = router.query;
	const [authType, setAuthType] = useState((type as AuthType) || AuthType.login);
	const isSignUp = authType === AuthType.signuUp;
	const photoUrls = new Array(5).fill('').map((_, i) => ({
		label: `Photo ${i + 1}`,
		url: `/images/anonymous${i + 1}.jpg`,
	}));

	const { data: usernameIsValid, mutate: verifyUsernameMutation } = useMutation(
		'verifyUsername',
		verifyUsername
	);

	const {
		mutate: submitMutation,
		error,
		isLoading,
	} = useMutation(
		'submit',
		async (args: FormikValues) => {
			const { email, password, fullName, photoUrl, username } = args;
			if (isSignUp) {
				if (usernameIsValid === undefined) {
					const isValid = await verifyUsername(username as string);
					if (!isValid) {
						throw new Error('Username is taken');
					}
				}

				if (usernameIsValid === false) {
					throw new Error('Username is taken');
				}

				await createUserWithEmailAndPassword(auth, email, password);

				const userRef = doc(db, `users/${auth.currentUser?.uid}`);
				await setDoc(userRef, {
					fullName,
					photoUrl: photoUrl?.url,
					username,
				});
			} else await signInWithEmailAndPassword(auth, email, password);
		},
		{
			onError(err: Error) {},
			onSuccess() {
				router.push(routes.home);
			},
		}
	);

	useEffect(() => {
		auth.signOut();
	}, []);

	return (
		<Container>
			<GoBackLink to={routes.home} />
			<Formik
				initialValues={
					{
						email: '',
						password: '',
						...(isSignUp
							? {
									fullName: '',
									username: '',
									photoUrl: { label: '', url: '' },
							  }
							: {}),
					} as FormikValues
				}
				validationSchema={yup.object({
					email: yup.string().email('invalid email').required('required'),
					password: yup
						.string()
						.min(6, 'password should be at least 6 characters')
						.required('required'),
					...(isSignUp
						? {
								fullName: yup.string().required('required'),
								username: yup.string().required('required'),
								photoUrl: yup.object({
									label: yup.string(),
									// TODO: validate (how do you handle default images?)
									url: yup.string().required('required'),
								}),
						  }
						: {}),
				})}
				onSubmit={(values) => {
					submitMutation(values);
				}}
			>
				{({ values, setFieldValue }) => (
					<StyledForm noValidate>
						<Switch>
							{Object.values(AuthType).map((value) => (
								<Link
									href={`${routes.auth}?type=${value}`}
									key={value}
									passHref
								>
									<StyledLink
										active={authType === value}
										type='button'
										onClick={() => setAuthType(value)}
									>
										{value}
									</StyledLink>
								</Link>
							))}
						</Switch>

						<Grid gap={2}>
							<FormInput label='Email'>
								<Textbox
									name='email'
									type='email'
									placeholder='example@email.com'
								/>
							</FormInput>

							{isSignUp && (
								<Fragment>
									<FormInput label='Full Name'>
										<Textbox name='fullName' placeholder='John Doe' />
									</FormInput>

									<FormInput label='Username'>
										<Textbox
											name='username'
											placeholder='john'
											onBlur={(e) =>
												verifyUsernameMutation(e.target.value)
											}
										/>
									</FormInput>

									<FormInput
										label='Photo Url'
										description='If you have a link to a custom image paste it here or select one of the images below'
									>
										<Grid gap={2}>
											<Textbox
												name='photoUrl.url'
												value={values.photoUrl?.label}
												placeholder='https://images.com/john.png'
												onChange={(e) =>
													setFieldValue('photoUrl', {
														label: e.target.value,
														url: e.target.value,
													})
												}
											/>
											<Flex $wrap gap={1.2}>
												{photoUrls.map((photoUrl) => {
													const { url } = photoUrl;
													return (
														<ProfilePhotoBtn
															key={url}
															active={
																values.photoUrl?.url ===
																url
															}
															type='button'
															onClick={() =>
																setFieldValue(
																	'photoUrl',
																	photoUrl
																)
															}
														>
															<ProfilePhoto
																src={url}
																alt=''
															/>
														</ProfilePhotoBtn>
													);
												})}
											</Flex>
										</Grid>
									</FormInput>
								</Fragment>
							)}

							<FormInput label='Password'>
								<Textbox
									name='password'
									type='password'
									placeholder='******'
								/>
							</FormInput>
						</Grid>

						{error && <ErrorMessage>{error.message}</ErrorMessage>}

						<Grid>
							<Submit
								type='submit'
								disabled={isLoading}
								isLoading={isLoading}
							>
								{isSignUp ? 'Sign Up' : 'Login'}
							</Submit>
						</Grid>
					</StyledForm>
				)}
			</Formik>
		</Container>
	);
}

const Container = styled.div`
	${contentStyles}
	min-height: calc(90vh - (2 * var(--app-padding)));
	display: grid;
	gap: 2rem;
	align-content: center;
	max-width: 470px;
`;

const StyledForm = styled(Form)`
	${cardStyles}
	${gridStyles}
    gap: 5rem;
	padding: 4rem 3rem;

	@media ${Breakpoints.tabletUp} {
		padding: 4rem;
	}
`;

const Submit = styled(Button)`
	padding-block: 1.5rem;

	&:focus {
		outline-color: var(--purple);
	}
`;

const Switch = styled.div`
	display: flex;
	border-bottom: 2.5px solid var(--black-transparent-200);
`;

interface StyledLinkProps {
	active: boolean;
}

const StyledLink = styled.a<StyledLinkProps>`
	color: var(--gray);
	padding: 1.5rem 0;
	font-weight: bold;
	position: relative;
	flex: 1;
	text-align: center;
	text-decoration: none;

	&:after {
		content: '';
		width: 100%;
		height: 2.5px;
		position: absolute;
		top: 100%;
		left: 0;
	}

	&:hover,
	&:focus {
		color: var(--purple);
	}

	&:focus {
		outline: 0;
	}

	${(p) =>
		p.active &&
		css`
			color: var(--purple);

			&:after {
				background: var(--purple);
			}
		`}
`;

interface ProfilePhotoProps {
	active: boolean;
}

const ProfilePhotoBtn = styled.button<ProfilePhotoProps>`
	--shadow-color: transparent;
	/* border-radius: 100%; */
	border-radius: var(--radius-400);
	box-shadow: 0 0 0 2.5px var(--shadow-color);
	overflow: hidden;
	display: grid;
	transition: all 0.2s;

	&:hover,
	&:focus {
		--shadow-color: var(--purple-transparent);
	}

	&:focus {
		outline: 0;
	}

	${(p) =>
		p.active &&
		css`
			--shadow-color: var(--purple);

			&:hover,
			&:focus {
				--shadow-color: var(--purple);
			}
		`}
`;

const ProfilePhoto = styled.img`
	width: 4.5rem;
	aspect-ratio: 1;
`;
