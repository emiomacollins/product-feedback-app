import { useField } from 'formik';
import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { ErrorMessage } from '../styled-components/ErrorMessage';
import { Textbox as StyledTextbox } from '../styled-components/Textbox';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	name: string; // to make it required
}

export default function Textbox(props: Props) {
	const { name, type } = props;
	const [fields, meta] = useField({ name, type });
	const isError = meta.touched && meta.error ? true : false;

	return (
		<Container>
			<StyledTextbox {...fields} {...props} isError={isError} />
			{isError && <ErrorMessage>{meta.error}</ErrorMessage>}
		</Container>
	);
}

const Container = styled.div`
	display: grid;
`;
