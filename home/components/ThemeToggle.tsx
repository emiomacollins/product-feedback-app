import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { Card } from '../../components/styled-components/Card';
import { Flex } from '../../components/styled-components/Flex';
import { getTheme, setTheme } from '../../lib/redux/slices/ui';

export default function ThemeToggle() {
	const dispatch = useDispatch();
	const theme = useSelector(getTheme);

	function handleToggleTheme() {
		dispatch(setTheme(theme === 'darkmode' ? 'lightmode' : 'darkmode'));
	}

	return (
		<Card>
			<Flex gap={2} spaceBetween>
				<Label>{theme}</Label>
				<Toggle theme={theme} onClick={handleToggleTheme}>
					<Circle />
				</Toggle>
			</Flex>
		</Card>
	);
}

interface ThemeProps {
	theme: string;
}

const Label = styled.p`
	color: var(--gray);
	text-transform: capitalize;
`;

const Toggle = styled.button<ThemeProps>`
	position: relative;
	background: var(--gray);
	border-radius: 10em;
	height: 3rem;
	width: 6rem;
	display: flex;
	transition: 0.2s;

	&:focus {
		outline-color: var(--blue-dark);
	}

	${(p) =>
		p.theme === 'darkmode' &&
		css`
			justify-content: right;
			${Circle} {
				left: calc(100% - var(--width) - var(--gap));
			}
		`}
`;

const Circle = styled.div`
	--width: 2rem;
	--gap: 0.5rem;
	background: var(--white);
	width: var(--width);
	aspect-ratio: 1;
	border-radius: 100%;
	position: absolute;
	top: var(--gap);
	left: var(--gap);
	transition: 0.2s;
`;
