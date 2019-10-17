import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/HomeScreen";
import RandomBeerScreen from "./src/screens/RandomBeerScreen";
import DetailsScreen from "./src/screens/DetailsScreen";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen,
});

const RandomStack = createStackNavigator({
    Random: RandomBeerScreen,
    Details: DetailsScreen,
});

export default createAppContainer(
    createBottomTabNavigator(
        {
            Home: HomeStack,
            Random: RandomStack,
        },
        {
            /* Other configuration remains unchanged */
        }
    )
);