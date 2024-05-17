import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { favoutriteMoviesContext } from '../Context/FavouriteMoviesContext';
import FavouriteCardComp from '../Components/FavouriteCard';

const FavouritePage = () => {
  const { FavMovies } = useContext(favoutriteMoviesContext);

  const renderMovieItem = ({ item }) => (
    <FavouriteCardComp key={item.id} movie={item} style={styles.card} />
  );

  return (
    <View style={styles.container}>
      {FavMovies.length === 0 ? (
        <View style={styles.emptyContainer}>
           <Image source={require('../assets/img1.webp')} style={styles.placeholderImage} />
          <Text style={styles.emptyText}>No favourite movies added yet.</Text>
        </View>
      ) : (
        <FlatList
          data={FavMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f0f0f0',
    backgroundColor:"black",
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
  },
  card: {
    marginBottom: 20,
  },
});

export default FavouritePage;
