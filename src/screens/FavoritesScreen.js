import React from "react"
import {
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Slider,
    ActivityIndicator,
    StyleSheet,
    Image,
    AsyncStorage
} from "react-native";
import Colors from "../constants/Colors";
import BeerList from "../components/BeerList";
import {NavigationEvents, ScrollView} from "react-navigation";

export default class AbvScreen extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            isLoading: false,
            beers: []
        }
    }

    addBeerToList(id){
        return fetch('https://api.punkapi.com/v2/beers/' + id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    beers: this.state.beers.concat(responseJson[0])
                })
            })
            .catch((error) =>{
                alert("An error has occurred");
                console.error(error);
            });
    }

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

    loadFavorites() {
        if (this.state.beers.length > 0) {
            this.setState({
                beers: []
            })
        }
        this._retrieveFavorite()
            .then(response => {
                let favorites = response !== undefined ? JSON.parse(response)  : [];
                favorites.forEach((id) => {
                    this.addBeerToList(id)
                        .then(res => {
                        })
                });

                this.setState({
                    isLoading: false,
                })

            })
            .catch((error) => {
                alert("An error has occurred while retrieving favorites");
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
            <View style={{flex: 1, paddingTop:20, alignItems: "center"}}>
                <NavigationEvents onDidFocus={() => this.loadFavorites()}/>
                <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Text style={styles.title}>Your Favorites Beer</Text>
                    {console.log(this.state.beers)}
                    <Text style={{color: Colors.textColor, marginTop: 10}}>Here is all your favorites beer!</Text>
                </View>
                <BeerList beers={this.state.beers} navigation={this.props.navigation}/>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 17,
        color: Colors.titleColor
    },

});