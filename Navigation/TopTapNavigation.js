import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "../pages/HomePage";
import { routes } from "../routes/routes";
import FavouritePage from "../pages/FavouritePage";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

function TopTapNavigation() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, color: "white" },
          tabBarStyle: { backgroundColor: "black" },
        }}
      >
        <Tab.Screen name={routes.home} component={HomePage} />
        <Tab.Screen name={routes.favoutrite} component={FavouritePage} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default TopTapNavigation;
