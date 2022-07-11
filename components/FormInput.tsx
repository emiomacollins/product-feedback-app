import { ReactNode } from 'react';
import styled from 'styled-components';
import { Grid } from './styled-components/Grid';

interface Props {
	label?: string;
	description?: string;
	children: ReactNode;
}

export default function FormInput({ label, description, children, ...props }: Props) {
	return (
		<Container {...props}>
			<Grid gap={0}>
				{label && <Label htmlFor={label}>{label}</Label>}
				{description && <Description>{description}</Description>}
			</Grid>
			{children}
		</Container>
	);
}

export const Container = styled.div`
	display: grid;
	gap: 1rem;
`;

const Label = styled.label`
	font-weight: 800;
	color: var(--blue-dark);
	font-size: var(--size-350);
`;
const Description = styled.p`
	font-size: var(--size-350);
`;
