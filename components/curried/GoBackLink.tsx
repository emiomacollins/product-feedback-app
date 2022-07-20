import { useRouter } from 'next/router';
import styled from 'styled-components';
import ArrowDownIcon from '../../assets/svgs/custom/ArrowDownIcon';
import { Color } from '../../types/colors';
import { Flex } from '../styled-components/Flex';
import { BoldLink } from './BoldLink';

interface Props {
	to?: string;
	color?: Color;
}

export default function GoBackLink({ to, color, ...props }: Props) {
	const router = useRouter();

	function handleGoBack() {
		to ? router.push(to) : router.back();
	}

	return (
		<StyledLink
			color={color || 'gray'}
			as={'button'} // for focus
			onClick={handleGoBack}
			{...props}
		>
			<Flex>
				<StyledArrowIcon color={color || 'gray'} /> <span>Go back</span>
			</Flex>
		</StyledLink>
	);
}

const StyledLink = styled(BoldLink)`
	padding-block: 1rem;
	text-decoration: none;
	justify-self: left;

	&&:focus {
		outline-color: var(--${(p) => p.color || 'gray'});
	}
`;

const StyledArrowIcon = styled(ArrowDownIcon)`
	transform: rotate(90deg);
`;
