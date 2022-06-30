import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';
import { contentStyles } from '../components/styled-components/Content';
import { Breakpoints } from '../constants/breakpoints';
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
		<QueryClientProvider client={queryClient}>
			<Head>
				<title>Feedback App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</QueryClientProvider>
	);
}

export default MyApp;

const Layout = styled.div`
	@media ${Breakpoints.tabletUp} {
		padding-block: 6rem;
		${contentStyles}
	}
`;
