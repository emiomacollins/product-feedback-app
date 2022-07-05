import { ReactNode } from 'react';
import styled from 'styled-components';
import { Grid } from './styled-components/Grid';

interface Props {
	label?: string;
	description?: string;
	children: ReactNode;
}

export default function FormInput({ label, description, children }: Props) {
	return (
		<Container>
			<Grid gap={0}>
				{label && <Label htmlFor={label}>{label}</Label>}
				{description && <p>{description}</p>}
			</Grid>
			{children}
		</Container>
	);
}

export const Container = styled.div`
	display: grid;
	gap: 1.2rem;
	font-size: var(--size-350);
`;

const Label = styled.label`
	font-weight: 800;
	color: var(--blue-dark);
`;
