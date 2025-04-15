import type { NextPage } from 'next';
import Head from 'next/head';

// Remplacer les chemins avec @ par des chemins relatifs
import StudioWorkspace from '../components/StudioWorkspace';
import TopMenu from '../components/TopMenu';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Mini-Studio IA</title>
        <meta name="description" content="Mini-studio de production audiovisuelle assisté par IA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopMenu />

      <main className="flex-1 overflow-hidden">
        <StudioWorkspace />
      </main>
    </div>
  );
};

export default Home;
