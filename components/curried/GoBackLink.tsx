import Link from 'next/link';
import styled from 'styled-components';
import ArrowDownIcon from '../../assets/svgs/custom/ArrowDownIcon';
import { routes } from '../../constants/routes';
import { BoldLink } from '../styled-components/BoldLink';
import { Flex } from '../styled-components/Flex';

export default function GoBackLink() {
	return (
		<Link href={routes.home} passHref>
			<StyledLink color='gray'>
				<Flex>
					<StyledArrowIcon color='gray' /> <span>Go back</span>
				</Flex>
			</StyledLink>
		</Link>
	);
}

const StyledLink = styled(BoldLink)`
	padding-block: 1rem;
	text-decoration: none;
	justify-self: left;
`;

const StyledArrowIcon = styled(ArrowDownIcon)`
	transform: rotate(90deg);
`;
