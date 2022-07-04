import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Grid } from './styled-components/Grid';

interface StyleProps {
	isError?: boolean;
}

interface Props extends InputHTMLAttributes<HTMLInputElement>, StyleProps {
	label?: string;
	description?: string;
}

export default function Textbox({ label, description, ...inputProps }: Props) {
	return (
		<Container>
			<Grid gap={0}>
				{label && <Label htmlFor={label}>{label}</Label>}
				{description && <p>{description}</p>}
			</Grid>
			<Input id={label} type='text' {...inputProps} />
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

const Input = styled.input<StyleProps>`
	padding: 1.5rem;
	background: var(--light);
	border: 0;
	border-radius: var(--radius-300);
	border: 1px solid ${(p) => (p.isError ? 'var(--red)' : 'transparent')};
	transition: all 0.2s;

	&:focus {
		border-color: var(--blue);
		outline: 0;
	}
`;
