import { signInAnonymously, signInWithPopup, UserCredential } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import Button from '../../components/Button';
import { ErrorMessage } from '../../components/styled-components/ErrorMessage';
import { Flex } from '../../components/styled-components/Flex';
import { routes } from '../../constants/routes';
import { auth, GoogleProvider } from '../../lib/firebase';

export default function Login() {
	const router = useRouter();
	const onSuccess = () => router.push(routes.home);

	const {
		mutate: signInWithGoogleMutation,
		error: googleError,
		isLoading: googleLoading,
	} = useMutation<UserCredential, Error>(
		'signInWithGoogle',
		() => signInWithPopup(auth, GoogleProvider),
		{ onSuccess }
	);

	const {
		mutate: signInAsGuestMutation,
		error: guestError,
		isLoading: guestLoading,
	} = useMutation<UserCredential, Error>(
		'signInAsGuest',
		() => signInAnonymously(auth),
		{ onSuccess }
	);

	useEffect(() => {
		auth.signOut();
	}, []);

	return (
		<Container>
			<Flex wrap>
				<Button
					$color='blue'
					onClick={() => signInWithGoogleMutation()}
					disabled={googleLoading}
				>
					Sign in with Google
				</Button>
				<Button onClick={() => signInAsGuestMutation()} disabled={guestLoading}>
					Sign in as Guest
				</Button>
			</Flex>
			{googleError && <ErrorMessage>{googleError.message}</ErrorMessage>}
			{guestError && <ErrorMessage>{guestError.message}</ErrorMessage>}
		</Container>
	);
}

const Container = styled.div`
	min-height: calc(100vh - (var(--app-padding) * 2));
	display: grid;
	place-content: center;
	text-align: center;
	gap: 1rem;
`;
