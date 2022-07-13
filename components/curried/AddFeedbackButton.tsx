import { useRouter } from 'next/router';
import styled from 'styled-components';
import PlusIconPath from '../../assets/svgs/icon-plus.svg';
import { routes } from '../../constants/routes';
import Button from '../Button';
import { Flex } from '../styled-components/Flex';
import WithUser from '../WithUser/WithUser';

export default function AddFeedbackButton() {
	const router = useRouter();
	return (
		<WithUser
			onClick={() => router.push(routes.createFeedback)}
			message='Sign in to add a Feedback'
		>
			<Button>
				<StyledFlex gap={0.5}>
					<Icon src={PlusIconPath.src} alt='' />
					<span>Add Feedback</span>
				</StyledFlex>
			</Button>
		</WithUser>
	);
}

const Icon = styled.img`
	width: 2rem;
	flex-shrink: 0;
`;

const StyledFlex = styled(Flex)`
	justify-content: center;
`;
