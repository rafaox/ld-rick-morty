import { useCharacters } from '../../hooks/useCharacters';
import { useFavorites } from '../../hooks/useFavorites';
import { CharacterCard } from '../CharacterCard';
import { Pagination } from '../Pagination';

import styles from './styles.module.scss';

export function CharactersList() {
  const { isLoading, error, characters } = useCharacters();
  const { favorites, isFavorites } = useFavorites();

  return (
    <>
      <div className={styles.charactersListContainer}>
        { isLoading ? (
          <div className={styles.feedbackContainer}>
            <h4>carregando...</h4>
          </div>
        ) : error ? (
          <div className={styles.feedbackContainer}>
            <h4>Arquivo inexistente!</h4>
          </div>
        ) : isFavorites ? (
          <>
            <ul>
              { favorites && favorites.map(char => (
                <CharacterCard
                  key={char.id}
                  char={char}
                />
              ))}
            </ul>
          </>
        ) : (
          <>
            <ul>
              { characters && characters.map(char => (
                <CharacterCard
                  key={char.id}
                  char={char}
                />
              ))}
            </ul>
          </>
        )}
      </div>

      { characters.length > 0 && !isFavorites && <Pagination />}
    </>
  );
}