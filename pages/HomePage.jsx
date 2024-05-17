import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text, Pressable, ImageBackground } from "react-native";
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

  const { popularMovies, nowPlayingMovies, upcomingMovies, topRatedMovies } = useContext(movieContext);

  const { navigate } = useNavigation();

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handleInputChange = (txt) => {
    setInputValue(txt);
    searchMovie(txt);
  };

  const renderMovieItem = ({ item }) => (
    <Pressable onPress={() => navigate(routes.movieDetails, item.id)}>
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
    setFilteredMovies(popularMovies);
  };

  const handleNowPlayingClick = () => {
    setFilteredMovies(nowPlayingMovies);
  };

  const handleUpComingClick = () => {
    setFilteredMovies(upcomingMovies);
  };

  const handleTopRatedClick = () => {
    setFilteredMovies(topRatedMovies);
  };

  return (
    <Provider>
      <ImageBackground
        source={{ uri: 'https://example.com/background.jpg' }} 
        style={styles.background}
      >
        <View style={styles.overlay}>
          <View style={styles.searchContainer}>
            <TextInput
              style={[styles.txtInput, { color: 'white' }]}
              placeholder="Search a Movie"
              selectionColor="white"
              textColor="white"
              placeholderTextColor="gray"
              value={inputValue}
              onChangeText={handleInputChange}
              underlineColor="transparent"
              theme={{ colors: { text: 'white', primary: 'white' } }}
            />
            <Menu
              visible={visible}
              style={{color:"black"}}
              contentStyle={{backgroundColor: "black"}}
              onDismiss={() => setVisible(false)}
              anchor={
                <Button
                  onPress={() => setVisible(true)}
                  style={styles.filterButton}
                  mode="contained"
                >
                  Filter
                </Button>
              }
            >
              <Menu.Item onPress={handlePopularClick}  titleStyle={{color: "white"}} title="Popular" />
              <Menu.Item onPress={handleNowPlayingClick} titleStyle={{color: "white"}} title="Now Playing" />
              <Menu.Item onPress={handleUpComingClick} titleStyle={{color: "white"}} title="Upcoming" />
              <Menu.Item onPress={handleTopRatedClick} titleStyle={{color: "white"}} title="Top Rated" />
              <Divider />
            </Menu>
          </View>
          <FlatList
            contentContainerStyle={styles.listContent}
            data={filteredMovies}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal={false}
          />
        </View>
      </ImageBackground>
    </Provider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#141414", 
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  },
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 20,
    alignItems: "center",
  },
  txtInput: {
    flex: 1,
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginHorizontal: 5
  },
  filterButton: {
    backgroundColor: "#009688", // Teal
  },
  listContent: {
    padding: 10,
  },

 
});

export default HomePage;
