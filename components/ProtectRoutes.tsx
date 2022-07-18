import { useRouter } from 'next/router';
import { Fragment, ReactNode } from 'react';
import { routes, unProtectedRoutes } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';

interface Props {
	children: ReactNode;
	unProtectedRoutes: string[];
}

export default function ProtectRoutes({ children }: Props) {
	const { user } = useAuth();
	const router = useRouter();

	if (
		router.asPath === routes.home ||
		unProtectedRoutes.find((route) => router.asPath.includes(route))
	)
		return <Fragment>{children}</Fragment>;

	if (!user) router.push(routes.auth);

	return <div>{user ? children : null}</div>;
}
