import Image from 'next/image';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import bellIconPath from '../../assets/svgs/icon-suggestions.svg';
import AddFeedbackButton from '../../components/curried/AddFeedbackButton';
import Dropdown from '../../components/Dropdown';
import Show from '../../components/Show';
import { contentStyles } from '../../components/styled-components/Content';
import { flexStyles } from '../../components/styled-components/Flex';
import WithUser from '../../components/WithUser/WithUser';
import { Breakpoints } from '../../constants/breakpoints';
import { useFeedbacks } from '../../hooks/useFeedbacks/useFeedbacks';
import { setFeedbackSort } from '../../lib/redux/slices/feedback';
import { FeedbackSortBy } from '../../types/feedback';

export default function Controls() {
	const dispatch = useDispatch();
	const { processedFeedbacks } = useFeedbacks();
	const count = processedFeedbacks?.length;

	function handleSetSort(value: FeedbackSortBy) {
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
					setValue={handleSetSort}
					options={Object.values(FeedbackSortBy).map((sort) => ({
						label: sort,
						value: sort,
					}))}
				/>

				<AddFeedbackButton />
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
	justify-items: left;
	/* flex-wrap: wrap; */
	gap: 1rem;
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

const Count = styled.div`
	${flexStyles}
	font-weight: bold;
	color: var(--white);
	font-size: var(--size-500);
`;

const CountIcon = styled.div`
	display: flex;
`;
