import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import Movie from "./Movie";
import { UserContext } from "../UI/Layout";
import Scene from "./Scene"

const Movies = (props) => {
  const movie = useContext(UserContext);
  const { sceneName } = useParams();
  return (
    <>
      {console.log(movie)}
      {/* <Movie scenes={movie.scenes} /> */}
      {/* <Scene scene={movie.scene[0]} /> */}
    </>
  );
};

export default Movies;
