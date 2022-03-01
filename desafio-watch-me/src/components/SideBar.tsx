import { useEffect, useState } from "react";
import { GenreResponseProps, ISidebarRequest } from "../@types/IMoviesTypes";
import { api } from '../services/api';
import { Button } from "./Button";

export function SideBar(props: ISidebarRequest) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const {selectedGenreId, setSelectedGenreId} = props.state;

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return ( 
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => setSelectedGenreId(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}