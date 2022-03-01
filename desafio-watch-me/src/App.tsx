import { useEffect, useState } from 'react';
import { MovieCard } from './components/MovieCard';
import { Content } from './components/Content';
import { SideBar } from './components/SideBar';
import { api } from './services/api';


import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';
import { GenreResponseProps, MovieProps } from './@types/IMoviesTypes';


export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>

      <SideBar state={{ selectedGenreId,  setSelectedGenreId}} />
      <Content state={{ selectedGenreId }} />

    </div>
  )
}