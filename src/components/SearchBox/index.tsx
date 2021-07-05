import { FormEvent, useState } from 'react';

import { AiFillStar } from 'react-icons/ai';

import { useCharacters } from '../../hooks/useCharacters';
import { useFavorites } from '../../hooks/useFavorites';

import styles from './styles.module.scss';

export function SearchBox() {
  const [name, setName] = useState('');
  const { searchCharacters } = useCharacters();
  const { favorites, isFavorites, selectFavoriteList } = useFavorites();

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    if (name) searchCharacters(name);
  }

  function handleFavorites(e: FormEvent): void {
    e.preventDefault();
    if (favorites.length > 0)
      selectFavoriteList()
    else {
      console.log("sem arquivos em análise")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.searchBoxContainer}
    >
      <div>
        <h1>Confidencial</h1>

        <AiFillStar
          size={28}
          color={isFavorites ? 'gold' : 'white'}
          title="Arquivos em análise (favoritos)"
          onClick={handleFavorites}
        />
      </div>

      <input
        type="text"
        placeholder="personagem..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button type="submit">
        Pesquisar
      </button>
    </form>
  );
}