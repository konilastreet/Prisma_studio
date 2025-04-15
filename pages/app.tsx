import type { AppProps } from 'next/app';
import '../styles/global.css'; // Importez le fichier CSS global ici

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
