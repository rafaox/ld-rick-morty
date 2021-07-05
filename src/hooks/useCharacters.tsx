import {
  createContext,
  ReactNode,
  useContext,
  useState
} from 'react';

import { api } from '../services/api';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  },
  location: {
    name: string;
    url: string;
  },
  image: string;
  isFavorite: boolean;
}

interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

interface CharactersContextData {
  isLoading: boolean;
  error: boolean;
  characters: Character[];
  info: Info;
  searchCharacters: (name: string) => Promise<void>;
  doPaginate: (page: string) => Promise<void>;
}

interface CharactersProviderProps {
  children: ReactNode
}

const CharactersContext = createContext<CharactersContextData>({} as CharactersContextData)

export function CharactersProvider({ children }: CharactersProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState<Info>({} as Info);
  const [characters, setCharacters] = useState<Character[]>([]);
  
  async function searchCharacters(name: string): Promise<void> {
    try {
      setIsLoading(true);
      setInfo({} as Info);
      setTimeout(async () => {
        await api.get(`character/?name=${name}`)
          .then(response => response.data)
          .then(result => {
            setIsLoading(false);
            setInfo(result.info);
            setCharacters(result.results);
          })
          .catch(err => {
            setIsLoading(false);
            setError(true);
          });
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  }

  async function doPaginate(page: string): Promise<void> {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        await api.get(page)
          .then(response => response.data)
          .then(result => {
            setIsLoading(false);
            setInfo(result.info);
            setCharacters(result.results);
          });
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  }

  return (
    <CharactersContext.Provider
      value={{
        isLoading,
        error,
        characters,
        info,
        searchCharacters,
        doPaginate
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
}

export const useCharacters = () => useContext(CharactersContext);
