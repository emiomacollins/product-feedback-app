import Image from 'next/image';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import plusIconPath from '../../assets/svgs/icon-plus.svg';
import bellIconPath from '../../assets/svgs/icon-suggestions.svg';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Show from '../../components/Show';
import { contentStyles } from '../../components/styled-components/Content';
import { Flex, flexStyles } from '../../components/styled-components/Flex';
import { Breakpoints } from '../../constants/breakpoints';
import { setFeedbackSort } from '../../lib/redux/slices/feedback';
import { Feedback, FeedbackSort } from '../../types/feedback';

interface Props {
	feedbacks: Feedback[];
}

export default function Controls({ feedbacks }: Props) {
	const dispatch = useDispatch();
	const count = feedbacks.length;

	function handleSetSort(value: FeedbackSort) {
		dispatch(setFeedbackSort(value));
	}

	return (
		<Container>
			<Content>
				<Show on={Breakpoints.tabletUp}>
					<Count>
						<CountIcon>
							<Image src={bellIconPath} alt='' />
						</CountIcon>
						<span>
							{count} Feedback
							{count !== 1 ? 's' : ''}
						</span>
					</Count>
				</Show>

				<Dropdown
					label='Sort-by'
					options={Object.values(FeedbackSort).map((sort) => ({
						label: sort,
						value: sort,
					}))}
					setValue={handleSetSort}
				/>

				<Button>
					<Flex gap={0.5}>
						<Icon>
							<Image src={plusIconPath} alt='' />
						</Icon>{' '}
						<span>Add Feedback</span>
					</Flex>
				</Button>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	background: var(--blue-dark);

	@media ${Breakpoints.tabletUp} {
		border-radius: var(--radius-400);
	}
`;

const Content = styled.div`
	${flexStyles}
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 1rem 2rem;
	padding-block: 1rem;

	@media ${Breakpoints.tabletDown} {
		${contentStyles}
	}

	@media ${Breakpoints.tabletUp} {
		padding-inline: 2rem 1.5rem;
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 1rem 4rem;
	}
`;

const Icon = styled.div`
	width: 1.5rem;
	aspect-ratio: 1;
	display: flex;
`;

const Count = styled.div`
	${flexStyles}
	font-weight: bold;
	color: var(--white);
	font-size: var(--size-500);
`;

const CountIcon = styled.div`
	display: flex;
`;
