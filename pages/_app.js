import { ThemeProvider } from 'next-themes';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
	return (
		<ThemeProvider attribute="class">
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
