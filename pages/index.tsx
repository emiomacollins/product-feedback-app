import type { NextPage } from 'next';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import gradientPath from '../assets/images/gradient-desktop.png';
import LoadQuery from '../components/LoadQuery';
import Show from '../components/Show';
import { Grid } from '../components/styled-components/Grid';
import { Breakpoints } from '../constants/breakpoints';
import fetchFeedbacks from '../home/api';
import Controls from '../home/components/Controls';
import FeedbackFilters from '../home/components/FeedbackFilters';
import Logo from '../home/components/Logo';
import Nav from '../home/components/Nav';
import { getFeedbackFilter } from '../lib/redux/slices/feedback';
import { Feedback } from '../types/feedback';

const Home: NextPage = () => {
	const fetchFeedbacksQuery = useQuery('fetchFeedbacks', fetchFeedbacks);
	const filter = useSelector(getFeedbackFilter);

	return (
		<Container>
			<Show on={Breakpoints.tabletDown}>
				<Nav />
			</Show>

			<LoadQuery query={fetchFeedbacksQuery}>
				{(feedbacks: Feedback[]) => {
					return (
						<Columns>
							<Show on={Breakpoints.tabletUp}>
								<Cards gap={2.5}>
									<LogoCard bg={gradientPath.src}>
										<StyledLogo />
									</LogoCard>
									<FeedbackFilters />
								</Cards>
							</Show>

							<Grid>
								<Controls feedbacks={feedbacks} />
							</Grid>
						</Columns>
					);
				}}
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
	gap: 2rem;
	align-items: flex-start;

	@media ${Breakpoints.desktopUp} {
		grid-template-columns: 300px 1fr;
	}
`;

const Cards = styled(Grid)`
	@media ${Breakpoints.desktopDown} {
		grid-template-columns: repeat(3, 1fr);
	}
`;

interface LogoCardProps {
	bg: string;
}

const LogoCard = styled.div<LogoCardProps>`
	display: grid;
	align-items: flex-end;
	background: url(${(p) => p.bg});
	background-size: cover;
	border-radius: var(--radius-400);
	padding: 2rem;
`;

const StyledLogo = styled(Logo)`
	margin-top: 2em;
`;
