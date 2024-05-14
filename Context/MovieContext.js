import React, { createContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export const movieContext = createContext()

const MovieContext = ({children}) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch(
          "https://api.themoviedb.org/3/discover/movie?api_key=750ea252b384c0245473348ca6525dc0"
        )
          .then((res) => res.json())
          .then((res) => {
              setMovies(res.results);
            }
        )
          .catch((er) => console.log("Error"));
       
      }, []);


    return (
        <movieContext.Provider value={{movies}}>
            {children}
        </movieContext.Provider>
    );
}

const styles = StyleSheet.create({})

export default MovieContext;
