import { useField } from 'formik';
import { FocusEventHandler, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { ErrorMessage } from '../styled-components/ErrorMessage';
import { Textbox as StyledTextbox } from '../styled-components/Textbox';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	name: string; // to make it required
}

export default function Textbox(props: Props) {
	const { name, type, onBlur } = props;
	const [fields, meta] = useField({ name, type });
	const isError = meta.touched && meta.error ? true : false;

	// add custom onBlur & not break formik's onBlur
	const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
		fields.onBlur(e);
		onBlur?.(e);
	};

	return (
		<Container>
			<StyledTextbox {...fields} {...props} isError={isError} onBlur={handleBlur} />
			{isError && <ErrorMessage>{meta.error}</ErrorMessage>}
		</Container>
	);
}

const Container = styled.div`
	display: grid;
`;
