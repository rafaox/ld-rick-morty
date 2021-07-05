import {
  createContext,
  ReactNode,
  useContext,
  useState
} from 'react';

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

interface FavoritesContextData {
  favorites: Character[];
  isFavorites: boolean;
  addOrRemoveFavorite: (favorite: Character) => void;
  selectFavoriteList: () => void;
}

interface FavoritesProviderProps {
  children: ReactNode
}

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData)

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [isFavorites, setIsFavorites] = useState(false);

  function addOrRemoveFavorite(favorite: Character): void {
    const tempFavorite = { ...favorite };
    tempFavorite.isFavorite = !tempFavorite.isFavorite;

    if (favorites.length <= 0) {
      setFavorites([tempFavorite]);
    } else {
      const index = favorites.indexOf(favorite);

      if (~index){
        setFavorites(favorites.filter(f => f.id != tempFavorite.id));
        if (favorites.length === 1)
          selectFavoriteList();
      }
      else
        setFavorites([...favorites, tempFavorite]);
    }
  }

  function selectFavoriteList(): void {
    setIsFavorites(!isFavorites);
  }

  return (
    <FavoritesContext.Provider
      value={{
        isFavorites,
        favorites,
        addOrRemoveFavorite,
        selectFavoriteList
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
