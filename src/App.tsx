import { useEffect, useState } from "react";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import { api } from "./services/api";

import { Genre } from "./@types/Genres";

import "./styles/global.scss";

import "./styles/sidebar.scss";
import "./styles/content.scss";

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  useEffect(() => {
    api.get<Genre>(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);


  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar selectedGenreId={selectedGenreId} handleClickButton={setSelectedGenreId} />
      <Content selectedGenreId={selectedGenreId} selectedGenre={selectedGenre} />
    </div>
  );
}
