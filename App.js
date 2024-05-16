// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MovieContext from "./Context/MovieContext";
import 'react-native-gesture-handler';
import FavouriteMoviesContext from "./Context/FavouriteMoviesContext";
import StackNavigatorComp from "./Navigation/StackNavigators";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <>
    <FavouriteMoviesContext>
    <MovieContext>
    <GestureHandlerRootView>
      <StackNavigatorComp>
      </StackNavigatorComp>
    </GestureHandlerRootView>
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
