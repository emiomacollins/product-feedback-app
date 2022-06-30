import type { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import plusIconPath from '../assets/svgs/icon-plus.svg';
import Button from '../components/Button';
import Dropdown, { DropdownOption } from '../components/Dropdown';
import Nav from '../components/Nav';
import Show from '../components/Show';
import { contentStyles } from '../components/styled-components/Content';
import { Flex, flexStyles } from '../components/styled-components/Flex';
import { Breakpoints } from '../constants/breakpoints';

const sortOptions: DropdownOption[] = [
	{ label: 'Most Upvotes', value: 'most_options' },
	{ label: 'Least Upvotes', value: 'least_options' },
	{ label: 'Most Comments', value: 'most_comments' },
	{ label: 'Least Comments', value: 'least_comments' },
];

const Home: NextPage = () => {
	const [sort, setSort] = useState(sortOptions[0]);
	const {} = useQuery('fetchFeedbacks');

	return (
		<Container>
			<Show on={Breakpoints.tabletDown}>
				<Nav />
			</Show>
			<Controls>
				<ControlsContent>
					<Dropdown
						label='Sort-by'
						options={sortOptions}
						selected={sort}
						setValue={setSort}
					/>
					<Button>
						<Flex gap={0.5}>
							<Icon>
								<Image src={plusIconPath} alt='' />
							</Icon>{' '}
							<span>Add Feedback</span>
						</Flex>
					</Button>
				</ControlsContent>
			</Controls>
		</Container>
	);
};

export default Home;

const Container = styled.div`
	display: grid;
`;

const Controls = styled.div`
	background: var(--blue-dark);

	@media ${Breakpoints.tabletUp} {
		border-radius: var(--radius-400);
	}
`;

const ControlsContent = styled.div`
	${flexStyles}
	justify-content: space-between;

	@media ${Breakpoints.tabletDown} {
		${contentStyles}
	}

	@media ${Breakpoints.tabletUp} {
		padding-inline: 2rem 1.5rem;
	}
`;

const Icon = styled.div`
	width: 1.5rem;
	aspect-ratio: 1;
	display: flex;
`;
