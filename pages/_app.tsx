import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { contentStyles } from '../components/styled-components/Content';
import { Breakpoints } from '../constants/breakpoints';
import { store } from '../lib/redux/store';
import '../styles/globals.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Head>
					<title>Feedback App</title>
					<link rel='icon' href='/favicon_.ico' />
				</Head>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</QueryClientProvider>
		</Provider>
	);
}

export default MyApp;

const Layout = styled.div`
	@media ${Breakpoints.tabletUp} {
		padding-block: 5rem;
		${contentStyles}
	}
`;
