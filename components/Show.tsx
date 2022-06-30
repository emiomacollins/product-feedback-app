import { Fragment, ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Breakpoints } from '../constants/breakpoints';

interface Props {
	on: Breakpoints;
	children: ReactNode;
}

export default function Show({ on, children }: Props) {
	const match = useMediaQuery({ query: on });
	return <Fragment>{match ? children : null}</Fragment>;
}
