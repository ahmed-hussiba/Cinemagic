import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { favoutriteMoviesContext } from '../Context/FavouriteMoviesContext';
import { FlatList } from 'react-native-gesture-handler';
import CardComp from '../Components/Card';
import FavouriteCardComp from '../Components/FavouriteCard';

const FavouritePage = () => {

    
    const {FavMovies} = useContext(favoutriteMoviesContext)


    // console.log(FavMovies);

    const renderMovieItem = ({ item }) => (
        <FavouriteCardComp key={item.id} movie={item} style={styles.card} />
      );

    return (
        <View style={styles.container}>
        <FlatList
          data={FavMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
        />
      </View>
    );
}

const styles = StyleSheet.create({})

export default FavouritePage;
