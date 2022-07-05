import { User } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebase';

interface Context {
	user: User | null;
}

const initialContextValue: Context = {
	user: null,
};

const AuthContext = createContext(initialContextValue);

interface Props {
	children: ReactNode;
}

export function AuthProvider({ children }: Props) {
	const [context, setContext] = useState(initialContextValue);
	const [authInitialized, setAuthInitialized] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setContext((context) => ({
				...context,
				user,
			}));
			setAuthInitialized(true);
		});
		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={context}>
			{authInitialized ? children : null}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
