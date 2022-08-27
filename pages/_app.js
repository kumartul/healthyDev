import { ThemeProvider } from 'next-themes';

import ThemeToggler from '../components/core/ThemeToggler';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
	return (
		<ThemeProvider attribute="class">
			<Component {...pageProps} />
			<ThemeToggler />
		</ThemeProvider>
	);
}

export default MyApp;
