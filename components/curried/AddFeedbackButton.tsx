import Image from 'next/image';
import Link from 'next/link';
import PlusIconPath from '../../assets/svgs/icon-plus.svg';
import { routes } from '../../constants/routes';
import Button from '../Button';
import { Flex } from '../styled-components/Flex';

export default function AddFeedbackButton() {
	return (
		<Link href={routes.createFeedback}>
			<Button>
				<Flex gap={0.5}>
					<Image src={PlusIconPath} alt='' width={20} height={20} />
					<span>Add Feedback</span>
				</Flex>
			</Button>
		</Link>
	);
}
