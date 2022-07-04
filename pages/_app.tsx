import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { contentStyles } from '../components/styled-components/Content';
import { Breakpoints } from '../constants/breakpoints';
import { AuthProvider } from '../hooks/AuthProvider';
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
				<AuthProvider>
					<Head>
						<title>Feedback App</title>
						<link rel='icon' href='/favicon_.ico' />
					</Head>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</AuthProvider>
			</QueryClientProvider>
		</Provider>
	);
}

export default MyApp;

const Layout = styled.div`
	padding-bottom: var(--app-padding);

	@media ${Breakpoints.tabletUp} {
		padding-block: var(--app-padding);
		${contentStyles}
	}
`;
