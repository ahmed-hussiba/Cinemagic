import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";
import { TextInput, Button, Menu, Divider, Provider } from "react-native-paper";
import CardComp from "../Components/Card";
import { movieContext } from "../Context/MovieContext";
import { useNavigation } from "@react-navigation/native";
import { routes } from "../routes/routes";

const HomePage = () => {
  const { movies } = useContext(movieContext);
  const [inputValue, setInputValue] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [visible, setVisible] = useState(false);

  const { popularMovies } = useContext(movieContext);
  const { nowPlayingMovies } = useContext(movieContext);
  const { upcomingMovies } = useContext(movieContext);
  const { topRatedMovies } = useContext(movieContext);



  const {navigate} = useNavigation()
  
  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handleInputChange = (txt) => {
    setInputValue(txt);
    searchMovie(txt);
  };

  const renderMovieItem = ({ item }) => (
    <Pressable onPress={() => navigate(routes.movieDetails)}>
      <CardComp isHomePage={true} key={item.id} movie={item} style={styles.card} />
    </Pressable>
  );

  const searchMovie = (txt) => {
    if (!txt) {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((m) =>
        m.original_title.toLowerCase().includes(txt.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

  const handlePopularClick = () => {
      setFilteredMovies(popularMovies)
    }
    
    const handleNowPlayingClick = () => {
      setFilteredMovies(nowPlayingMovies)
      
    }
    
    const handleUpComingClick = () => {
      setFilteredMovies(upcomingMovies)
      
    }
    
    const handleTopRatedClick = () => {
    setFilteredMovies(topRatedMovies)

  }


  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.txtInput, { color: "white" }]}
            placeholder="Search a Movie"
            value={inputValue}
            onChangeText={handleInputChange}
          />
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <Button onPress={() => setVisible(true)} style={{ backgroundColor: "black" }}>
                Filter
              </Button>
            }
          >
            <Menu.Item onPress={handlePopularClick} title="Popular" />
            <Menu.Item onPress={handleNowPlayingClick} title="Now Playing" />
            <Menu.Item onPress={handleUpComingClick} title="Upcoming" />
            <Menu.Item onPress={handleTopRatedClick} title="Top Rated" />
            <Divider />
          </Menu>
        </View>
        <FlatList
          data={filteredMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
  },
  txtInput: {
    flex: 1,
    height: 45,
    marginRight: 10,
  },
});

export default HomePage;
