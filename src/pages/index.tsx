import Head from 'next/head';
import React from 'react';
import { CharactersList } from '../components/CharactersList';

import { SearchBox } from '../components/SearchBox';

import styles from '../styles/pages/home.module.scss';

export default function Home() {

  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Rick and Morty</title>
      </Head>
      
      <SearchBox />

      <CharactersList />
    </div>
  )
}
