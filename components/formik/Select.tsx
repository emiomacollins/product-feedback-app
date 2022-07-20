import { useField, useFormikContext } from 'formik';
import styled from 'styled-components';
import Dropdown, { DropdownProps } from '../Dropdown';
import { ErrorMessage } from '../styled-components/ErrorMessage';
import { textboxStyles } from '../styled-components/Textbox';

interface Props extends Omit<DropdownProps, 'setValue'> {
	name: string;
}

export default function Select(props: Props) {
	const { name } = props;
	const [fields, meta] = useField(name);
	const { setFieldValue } = useFormikContext();
	const isError = meta.touched && meta.error ? true : false;

	return (
		<Container>
			<StyledDropdown
				{...fields}
				{...props}
				type='button'
				setValue={(value) => {
					setFieldValue(name, value);
				}}
			/>
			{isError && <ErrorMessage>{meta.error}</ErrorMessage>}
		</Container>
	);
}

const Container = styled.div`
	display: grid;
`;

const StyledDropdown = styled(Dropdown)`
	${textboxStyles}
	color: var(--blue-dark) !important;

	path {
		stroke: var(--blue-dark);
	}
`;
