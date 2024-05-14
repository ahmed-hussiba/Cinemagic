// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomePage from "./pages/HomePage";
import MovieContext from "./Context/MovieContext";
import DrawerNavigation from "./Navigation/DrawerNavigation";
import 'react-native-gesture-handler';
import FavouriteMoviesContext from "./Context/FavouriteMoviesContext";

export default function App() {
  return (
    <>
    <FavouriteMoviesContext>
    <MovieContext>
    <DrawerNavigation>
    </DrawerNavigation>
    </MovieContext>
    </FavouriteMoviesContext>
    </>
     
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
});
