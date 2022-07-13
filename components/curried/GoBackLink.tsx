import { useRouter } from 'next/router';
import styled from 'styled-components';
import ArrowDownIcon from '../../assets/svgs/custom/ArrowDownIcon';
import { BoldLink } from '../styled-components/BoldLink';
import { Flex } from '../styled-components/Flex';

interface Props {
	to?: string;
}

export default function GoBackLink({ to }: Props) {
	const router = useRouter();

	function handleGoBack() {
		to ? router.push(to) : router.back();
	}

	return (
		<StyledLink color='gray' as={'button'} onClick={handleGoBack}>
			<Flex>
				<StyledArrowIcon color='gray' /> <span>Go back</span>
			</Flex>
		</StyledLink>
	);
}

const StyledLink = styled(BoldLink)`
	padding-block: 1rem;
	text-decoration: none;
	justify-self: left;

	&:focus {
		outline-color: currentColor;
	}
`;

const StyledArrowIcon = styled(ArrowDownIcon)`
	transform: rotate(90deg);
`;
