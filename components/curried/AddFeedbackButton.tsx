import Image from 'next/image';
import { useRouter } from 'next/router';
import PlusIconPath from '../../assets/svgs/icon-plus.svg';
import { routes } from '../../constants/routes';
import Button from '../Button';
import { Flex } from '../styled-components/Flex';
import WithUser from '../WithUser';

export default function AddFeedbackButton() {
	const router = useRouter();
	return (
		<WithUser
			onClick={() => router.push(routes.createFeedback)}
			message='Sign in to add a Feedback'
		>
			<Button>
				<Flex gap={0.5}>
					<Image src={PlusIconPath} alt='' width={20} height={20} />
					<span>Add Feedback</span>
				</Flex>
			</Button>
		</WithUser>
	);
}
