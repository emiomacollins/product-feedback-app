import styled from 'styled-components';

export default function NoFeedbackMessage() {
	return (
		<Container>
			<h2>There are no feedbacks</h2>
		</Container>
	);
}

const Container = styled.div`
	text-align: center;
	padding-top: 4rem;
`;
