import type { NextPage } from 'next';
import styled from 'styled-components';
import LoadQuery from '../components/LoadQuery';
import Show from '../components/Show';
import { Card } from '../components/styled-components/Card';
import { Grid } from '../components/styled-components/Grid';
import { Breakpoints } from '../constants/breakpoints';
import Controls from '../home/components/Controls';
import FeedbackList from '../home/components/FeedbackList';
import Filters from '../home/components/Filters';
import Logo from '../home/components/Logo';
import Nav from '../home/components/Nav';
import RoadmapCard from '../home/components/RoadmapCard';
import { useFeedbacks } from '../hooks/useFeedbacks/useFeedbacks';

const Home: NextPage = () => {
	const { query } = useFeedbacks();

	return (
		<Container>
			<Show on={Breakpoints.tabletDown}>
				<Nav />
			</Show>

			<LoadQuery query={query}>
				{() => (
					<Columns>
						<Show on={Breakpoints.tabletUp}>
							<Cards gap={2.5}>
								<LogoCard>
									<StyledLogo />
								</LogoCard>
								<Filters />
								<RoadmapCard />
							</Cards>
						</Show>

						<RightColumn>
							<Controls />
							<FeedbackList />
						</RightColumn>
					</Columns>
				)}
			</LoadQuery>
		</Container>
	);
};

export default Home;

const Container = styled.div`
	display: grid;
`;

const Columns = styled.div`
	display: grid;
	gap: 5rem;
	align-items: flex-start;

	@media ${Breakpoints.desktopUp} {
		grid-template-columns: 300px 1fr;
		gap: 3rem;
	}
`;

const Cards = styled(Grid)`
	align-content: flex-start;
	@media ${Breakpoints.desktopDown} {
		grid-template-columns: repeat(3, 1fr);
	}
`;

const LogoCard = styled(Card)`
	display: grid;
	align-items: flex-end;
	background: var(--gradient);
`;

const StyledLogo = styled(Logo)`
	margin-top: 2em;
`;

const RightColumn = styled(Grid)`
	gap: 2rem;
	@media ${Breakpoints.tabletUp} {
		gap: 2.5rem;
	}
`;
