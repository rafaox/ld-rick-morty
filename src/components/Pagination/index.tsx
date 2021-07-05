import { FormEvent } from 'react';

import { useCharacters } from '../../hooks/useCharacters';

import styles from './styles.module.scss';

export function Pagination() {
  const { info, doPaginate } = useCharacters();

  function handlePagination(e: FormEvent) {
    e.preventDefault();
    const text = e.target as HTMLInputElement;
    if (text.value)
      doPaginate(text.value);
  }

  return (
    <div className={styles.paginationContainer}>
      <h5>{`Total: ${info.count || 0}`}</h5>

      <div>
        <button
          color={!!info.prev ? '#fff' : '#3d3d3d'}
          disabled={!info.prev}
          value={info.prev}
          onClick={handlePagination}
        >
          &#x2039;
        </button>
        <button
          color={!!info.next ? '#fff' : '#3d3d3d'}
          disabled={!info.next}
          value={info.next}
          onClick={handlePagination}
        >
          &#x203A;
        </button>
      </div>
    </div>
  );
}