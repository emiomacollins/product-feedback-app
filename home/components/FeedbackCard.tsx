import styled from 'styled-components';
import { Feedback } from '../../types/feedback';

interface Props {
	feedback: Feedback;
}

export default function FeedbackCard({ feedback }: Props) {
	console.log(feedback);
	return <Container>FeedbackCard</Container>;
}

const Container = styled.div``;
