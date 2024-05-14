import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '../pages/HomePage';
import { routes } from '../routes/routes';
import FavouritePage from '../pages/FavouritePage';

const drawer =  createDrawerNavigator()
const DrawerNavigation = () => {
    console.log(routes.home);
    return (
        <NavigationContainer>
            <drawer.Navigator>
            <drawer.Screen name={routes.home} component={HomePage}></drawer.Screen>
            <drawer.Screen name= {routes.favoutrite} component={FavouritePage} ></drawer.Screen>
            </drawer.Navigator>
        </NavigationContainer>
    );
}
    
    
const styles = StyleSheet.create({})

export default DrawerNavigation;
