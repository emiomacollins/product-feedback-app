import styled from 'styled-components';
import { Color } from '../../types/colors';

interface StyleProps {
	color?: Color;
}

function Spinner(props: StyleProps) {
	return (
		<Container>
			<Icon {...props} />
		</Container>
	);
}

export default Spinner;

const Container = styled.div`
	display: grid;
	place-content: center;
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const Icon = styled.div<StyleProps>`
	height: 2.5em;
	aspect-ratio: 1;
	border-radius: 50%;
	border-top: 2px solid var(--${(p) => p.color || 'purple'});
	border-right: 2px solid transparent;
	animation: spin 1s linear infinite;

	.darkmode & {
		border-color: var(--blue-dark);
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
`;
