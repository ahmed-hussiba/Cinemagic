import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../routes/routes';
import HomePage from '../pages/HomePage';
import FavouritePage from '../pages/FavouritePage';
import MovieDetailsPage from '../pages/MovieDetailsPage';
import { NavigationContainer } from '@react-navigation/native';
import TopTapNavigation from './TopTapNavigation';

export const Stack = createNativeStackNavigator();

function StackNavigatorComp() {
  return (
    <NavigationContainer>
    <Stack.Navigator >
      <Stack.Screen options={{headerShown:false}}  name={routes.topTapNaivgation} component={TopTapNavigation} />
      <Stack.Screen options={{headerShown:false}}  name={routes.home} component={HomePage} />
      <Stack.Screen options={{headerShown:false}}  name={routes.favoutrite} component={FavouritePage} />
      <Stack.Screen options={{headerShown:false}}  name={routes.movieDetails} component={MovieDetailsPage} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigatorComp