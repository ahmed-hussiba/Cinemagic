import React, { createContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export const movieContext = createContext();

const MovieContext = ({ children }) => {

  const [movies, setMovies] = useState([]);
  
  const [popularMovies, setPopularMovies] = useState([]);
  
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  
  
  
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=750ea252b384c0245473348ca6525dc0"
    )
    .then((res) => res.json())
    .then((res) => {
      
      setMovies(res.results);
    })
    .catch((er) => console.log("Error: ", er));
  }, []);

  //-------------POPULAR

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=750ea252b384c0245473348ca6525dc0"
    )
      .then((res) => res.json())
      .then((res) => {
        setPopularMovies(res.results);
      })
      .catch((er) => console.log("Error: ", er));
  }, []);

  // //----------- NowPlayingMovies

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=750ea252b384c0245473348ca6525dc0"
    )
      .then((res) => res.json())
      .then((res) => {
        setNowPlayingMovies(res.results);
      })
      .catch((er) => console.log("Error: ", er));
  }, []);
  // ///-----------UpComing

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=750ea252b384c0245473348ca6525dc0"
    )
      .then((res) => res.json())
      .then((res) => {
        setUpcomingMovies(res.results);
      })
      .catch((er) => console.log("Error: ", er));
  }, []);

  // ///-----------Top Rated

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=750ea252b384c0245473348ca6525dc0"
    )
      .then((res) => res.json())
      .then((res) => {
        setTopRatedMovies(res.results);
      })
      .catch((er) => console.log("Error: ", er));
  }, []);
  return (
    <movieContext.Provider value={{ movies, popularMovies, nowPlayingMovies, upcomingMovies, topRatedMovies }}>{children}</movieContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default MovieContext;
