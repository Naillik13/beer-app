import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import TabBarIcon from "./src/components/TabBarIcon"
import {Platform, Text} from "react-native"
import AbvScreen from "./src/screens/AbvScreen";
import SearchScreen from "./src/screens/SearchScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen,
});

HomeStack.navigationOptions = {
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-beer`
                    : 'md-beer'
            }
        />
    ),
};

HomeStack.path = '';

const AbvStack = createStackNavigator({
    Home: AbvScreen,
    Details: DetailsScreen,
});

AbvStack.navigationOptions = {
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-thermometer`
                    : 'md-thermometer'
            }
        />
    ),
};

AbvStack.path = '';

const SearchStack = createStackNavigator({
    Search: SearchScreen,
    Details: DetailsScreen,
});

SearchStack.navigationOptions = {
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-search`
                    : 'md-search'
            }
        />
    ),
};

SearchStack.path = '';

const FavoritesStack = createStackNavigator({
    Favorites: FavoritesScreen,
    Details: DetailsScreen,
});

FavoritesStack.navigationOptions = {
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-heart-empty`
                    : 'md-heart-empty'
            }
        />
    ),
};

FavoritesStack.path = '';

export default createAppContainer(
    createBottomTabNavigator(
        {
            Home: HomeStack,
            Abv: AbvStack,
            Search: SearchStack,
            Favorites: FavoritesStack

        },
        {
            tabBarOptions: {
                showLabel: false, // hide labels
            },
            initialRouteName: "Home"
        }
    )
);