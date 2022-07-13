import styled from 'styled-components';
import Show from '../components/Show';
import { Card } from '../components/styled-components/Card';
import { Flex } from '../components/styled-components/Flex';
import { Grid } from '../components/styled-components/Grid';
import { Breakpoints } from '../constants/breakpoints';
import Controls from '../home/components/Controls';
import FeedbackList from '../home/components/FeedbackList';
import Filters from '../home/components/Filters';
import Logo from '../home/components/Logo';
import Nav from '../home/components/Nav';
import ProfileDropdown from '../home/components/ProfileDropdown';
import RoadmapCard from '../home/components/RoadmapCard';
import fetchFeedbacks from '../hooks/useFeedbacks/api/fetchFeedbacks';
import { useFeedbacks } from '../hooks/useFeedbacks/useFeedbacks';
import { Feedback } from '../types/feedback';

interface Props {
	initialFeedbacks: Feedback[];
}

const Home = ({ initialFeedbacks }: Props) => {
	useFeedbacks({ initialValue: initialFeedbacks });

	return (
		<Container>
			<Show on={Breakpoints.tabletDown}>
				<Nav />
			</Show>

			<Content>
				<Show on={Breakpoints.tabletUp}>
					<Cards gap={2.5}>
						<LogoCard>
							<Flex spaceBetween>
								<Logo />
								<ProfileDropdown />
							</Flex>
						</LogoCard>

						<Filters />

						<RoadmapCard />
					</Cards>
				</Show>

				<StyledGrid>
					<Controls />
					<FeedbackList />
				</StyledGrid>
			</Content>
		</Container>
	);
};

export default Home;

const Container = styled.div`
	display: grid;
`;

const Content = styled.div`
	display: grid;
	gap: 5rem;
	align-items: flex-start;

	@media ${Breakpoints.desktopUp} {
		grid-template-columns: 280px 1fr;
		gap: 3rem;
	}
`;

const Cards = styled(Grid)`
	@media ${Breakpoints.desktopDown} {
		grid-template-columns: repeat(3, 1fr);
	}

	@media ${Breakpoints.desktopUp} {
		position: sticky;
		top: 2rem;
		left: 0px;
	}
`;

const LogoCard = styled(Card)`
	display: grid;
	align-items: flex-end;
	background: var(--gradient);
	min-height: 160px;
	padding-block: 2.5rem;
`;

const StyledGrid = styled(Grid)`
	gap: 2rem;

	@media ${Breakpoints.tabletUp} {
		gap: 2.5rem;
	}
`;

export async function getServerSideProps() {
	const initialFeedbacks = await fetchFeedbacks();
	return {
		props: {
			initialFeedbacks,
		},
	};
}
