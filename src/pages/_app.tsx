import type { AppProps } from 'next/app';

import { CharactersProvider } from '../hooks/useCharacters';
import { FavoritesProvider } from '../hooks/useFavorites';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CharactersProvider>
      <FavoritesProvider>
        <Component {...pageProps} />
      </FavoritesProvider>
    </CharactersProvider>
  );
}
export default MyApp
