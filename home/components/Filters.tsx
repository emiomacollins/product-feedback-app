import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Badge } from '../../components/styled-components/Badge';
import { Card } from '../../components/styled-components/Card';
import { flexStyles } from '../../components/styled-components/Flex';
import { getFeedbackFilter, setFeedbackFilter } from '../../lib/redux/slices/feedback';
import { FeedbackCategory } from '../../types/feedback';

interface Props {
	onClick?: () => void;
}

export default function Filters({ onClick }: Props) {
	const filter = useSelector(getFeedbackFilter);
	const dispatch = useDispatch();

	function handleSetFilter(filter: FeedbackCategory | null) {
		dispatch(setFeedbackFilter(filter));
		onClick?.();
	}

	return (
		<Container>
			<Badge active={!filter} onClick={() => handleSetFilter(null)}>
				All
			</Badge>

			{Object.values(FeedbackCategory).map((category) => (
				<Badge
					key={category}
					active={filter === category}
					onClick={() => handleSetFilter(category)}
				>
					{category}
				</Badge>
			))}
		</Container>
	);
}

const Container = styled(Card)`
	${flexStyles}
	flex-wrap: wrap;
	gap: 1.5rem 1rem;
`;
