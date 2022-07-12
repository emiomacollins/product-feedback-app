import { useField } from 'formik';
import { forwardRef, Ref, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';
import { ErrorMessage } from '../styled-components/ErrorMessage';
import { textboxStyles } from '../styled-components/Textbox';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string;
}

function TextArea(props: Props, ref: Ref<HTMLTextAreaElement>) {
	const { name } = props;
	const [fields, meta] = useField(name);
	const isError = meta.touched && meta.error ? true : false;

	return (
		<Container>
			<StyledTextArea
				ref={ref as any}
				isError={isError}
				rows={5}
				{...fields}
				{...props}
			/>
			{isError && <ErrorMessage>{meta.error}</ErrorMessage>}
		</Container>
	);
}

export default forwardRef(TextArea);

const Container = styled.div`
	display: grid;
`;

const StyledTextArea = styled.textarea`
	${textboxStyles}
	resize: vertical;
`;
