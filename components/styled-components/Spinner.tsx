import styled from 'styled-components';
import { Color } from '../../types/colors';

interface Props {
	color?: Color;
}

function Spinner(props: Props) {
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
	padding-top: 2rem;
`;

const Icon = styled.div<Props>`
	height: 2.5em;
	aspect-ratio: 1;
	border-radius: 50%;
	border-top: 2px solid var(--${(p) => p.color || 'purple'});
	border-right: 2px solid transparent;
	animation: spin 1s linear infinite;

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
`;
