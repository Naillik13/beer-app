import React from "react"
import {Platform, TouchableOpacity, View, Text, ActivityIndicator} from "react-native";
import { AsyncStorage } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import BeerDetails from "../components/BeerDetails";
import Colors from "../constants/Colors"
import {NavigationEvents, ScrollView} from "react-navigation";

export default class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            favoriteList: []
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={{color: Colors.tintColor, marginRight: 3}}>{navigation.state.params.favoritesNumber}</Text>
                <TouchableOpacity style={{marginRight: 15}} onPress={navigation.getParam("favoriteAction")}>
                    <Ionicons
                        name={
                            Platform.OS === 'ios'
                                ? 'ios-heart' + (navigation.state.params.isFavorite ? '' : '-empty')
                                : 'md-heart' + (navigation.state.params.isFavorite ? '' : '-empty')
                        }
                        size={25}
                        color={Colors.tintColor}
                    />
                </TouchableOpacity>
            </View>
        ),
        headerTintColor: Colors.tintColor
    });

    _retrieveFavorite = async () => {
        try {
            const value = await AsyncStorage.getItem('@Favorite:beers');
            if (value !== null) {
                console.log(value);
                return value
            }
        } catch (error) {
            alert("An error has occurred while retrieving favorites");
        }
    };

    // true = add, false = remove
    _updateFavoriteStorage = async (typeAction) => {
        try {
            let newArray = this.state.favoriteList;
            if (typeAction) {
                newArray.push(this.state.beer.id)
            } else {
                newArray = newArray.filter(id => id !== this.state.beer.id);
            }
            this.setState({
                favoriteList: newArray
            });
            await AsyncStorage.setItem('@Favorite:beers', JSON.stringify(newArray));
            return newArray
        } catch (error) {
            alert("An error has occurred while updating favorites");
        }
    };

    _updateFavorite = () => {
        this._updateFavoriteStorage(!this.props.navigation.state.params.isFavorite)
            .then(res => {
                    this.props.navigation.setParams({isFavorite: !this.props.navigation.state.params.isFavorite});
                    this.props.navigation.setParams({favoritesNumber: res.length});
                }
            );
        };

    loadFavorites() {
        this._retrieveFavorite()
            .then(response => {
                let favorites = response !== undefined ? JSON.parse(response)  : [];
                this.props.navigation.setParams({isFavorite: favorites.includes(this.state.beer.id)});
                this.props.navigation.setParams({favoritesNumber: favorites.length});
                this.setState({
                        favoriteList: favorites
                    }
                );
                this.props.navigation.setParams({ favoriteAction: () => this._updateFavorite() });

            })
            .catch((error) => {
                alert("An error has occurred while retrieving favorites");
                console.error(error);
            });
    }

    componentDidMount(){
        return fetch('https://api.punkapi.com/v2/beers/' + this.props.navigation.getParam("id"))
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    beer: responseJson[0],
                }, function(){

                });

            })
            .catch((error) =>{
                alert("An error has occurred while fetching beer");
                console.error(error);
            });
    }

    render(){

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return(
            <ScrollView style={{flex: 1, paddingTop:20}}>
                <NavigationEvents onDidFocus={() => this.loadFavorites()}/>
                <BeerDetails beer={this.state.beer}/>
            </ScrollView>
        );
    }

}

