import { useField } from 'formik';
import { TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';
import { ErrorMessage } from '../styled-components/ErrorMessage';
import { textboxStyles } from '../styled-components/Textbox';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string;
}

export default function TextArea(props: Props) {
	const { name } = props;
	const [fields, meta] = useField(name);
	const isError = meta.touched && meta.error ? true : false;

	return (
		<Container>
			<StyledTextArea {...fields} {...props} isError={isError} rows={7} />
			{isError && <ErrorMessage>{meta.error}</ErrorMessage>}
		</Container>
	);
}

const Container = styled.div`
	display: grid;
`;

const StyledTextArea = styled.textarea`
	${textboxStyles}
`;
