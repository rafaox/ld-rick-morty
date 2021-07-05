import Image from 'next/image';

import { AiFillStar } from 'react-icons/ai';

import { useFavorites } from '../../hooks/useFavorites';

import styles from './styles.module.scss';

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

interface CharacterCardProps {
  char: Character;
}

export function CharacterCard({ char }: CharacterCardProps) {
  const { favorites, addOrRemoveFavorite } = useFavorites();

  function handleFavorite() {
    addOrRemoveFavorite(char);
  }

  return (
    <li className={styles.characterCardItem}>
      <Image
        src={char.image}
        alt={char.name}
        width={150}
        height={150}
      />
      
      <div className={styles.infoContainer}>
        <h4>Nome: {char.name}</h4>
        <p>Status: {char.status}</p>
        <p>Espécie: {char.species}</p>
        <p>Tipo: {char.type}</p>
        <p>Gênero: {char.gender}</p>
        <p>Origem: {char.origin?.name}</p>
        <p>Localização: {char.location?.name}</p>
      </div>

      <AiFillStar
        size={24}
        color={favorites.some(f => f.id === char.id) ? 'gold' : 'white'}
        onClick={handleFavorite}
      />
    </li>
  );
}