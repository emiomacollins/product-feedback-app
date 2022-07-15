import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import bellIconPath from '../../assets/svgs/icon-suggestions.svg';
import AddFeedbackButton from '../../components/curried/AddFeedbackButton';
import Dropdown from '../../components/Dropdown';
import Show from '../../components/Show';
import { contentStyles } from '../../components/styled-components/Content';
import { flexStyles } from '../../components/styled-components/Flex';
import { Breakpoints } from '../../constants/breakpoints';
import { useFeedbacks } from '../../hooks/useFeedbacks/useFeedbacks';
import { getFeedbackSort, setFeedbackSort } from '../../lib/redux/slices/feedback';
import { FeedbackSortBy } from '../../types/feedback';

export default function Controls() {
	const dispatch = useDispatch();
	const { processedFeedbacks } = useFeedbacks();
	const count = processedFeedbacks?.length;
	const feedbackSort = useSelector(getFeedbackSort);

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

				<StyledDropdown
					label='Sort-by'
					setValue={handleSetSort}
					selected={{ label: feedbackSort, value: feedbackSort }}
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
	gap: 1rem 2rem;
	padding-block: 1.5rem;
	flex-wrap: wrap;

	@media ${Breakpoints.mobileDown} {
		> * {
			flex-grow: 1;
		}
	}

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

const StyledDropdown = styled(Dropdown)`
	justify-content: center;
`;
