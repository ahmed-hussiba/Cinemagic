import React, { useState } from 'react';
import { createContext } from "react";
import { StyleSheet, View } from 'react-native';

export const favoutriteMoviesContext  =   createContext()

const FavouriteMoviesContext = ({children}) => {

    const [FavMovies, setFavMovies] = useState([])


    console.log("from context",FavMovies);

    return (
        <favoutriteMoviesContext.Provider value={{setFavMovies, FavMovies}}>
            {children}
        </favoutriteMoviesContext.Provider>
    );
}

const styles = StyleSheet.create({})

export default FavouriteMoviesContext;
