import Router from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function ProgressBar() {
	const [progress, setprogress] = useState(0);
	const maxProgress = 80;
	const progressIncrement = 5;

	const updateProgress = () => {
		setprogress((progress) => {
			const newProgress = progress + progressIncrement;
			return newProgress <= maxProgress ? newProgress : maxProgress;
		});
	};

	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;
		Router.events.on('routeChangeStart', () => {
			clearInterval(interval);
			setprogress(10);
			interval = setInterval(updateProgress, 1500);
		});
		Router.events.on('routeChangeComplete', () => {
			setprogress(0);
			clearInterval(interval);
		});
	}, []);

	return (
		<Container>
			<Bar progress={progress} />
		</Container>
	);
}

interface Props {
	progress: number;
}

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 0.3rem;
	z-index: 100;
`;

const Bar = styled.div<Props>`
	background: var(--blue-dark);
	width: ${(p) => p.progress}%;
	height: 100%;
	transition: 0.2s;
`;
