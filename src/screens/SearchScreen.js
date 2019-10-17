import React from "react"
import {Text, View, TextInput, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image} from "react-native";
import Colors from "../constants/Colors";
import BeerList from "../components/BeerList";

export default class SearchScreen extends React.Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: false}
    }

    getBeersBySearch = (name) => {
        this.setState({
            isLoading: true
        });
        fetch('https://api.punkapi.com/v2/beers?beer_name=' + this.state.search)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    isLoading: false,
                    beers: responseJson,
                }, function(){

                });

            })
            .catch((error) =>{
                alert("An error has occurred while fetching beer list");
                console.error(error);
            });
    };

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
                <Text style={styles.title}>Search  your favorite beer!</Text>
                <TextInput
                    style={{height: 40, width: 200, textAlign: "center", color: Colors.tilte}}
                    placeholder="Search beer!"
                    onChangeText={(search) => this.setState({search: search})}
                    onEndEditing={() => this.getBeersBySearch()}
                    value={this.state.text}
                />
                <BeerList beers={this.state.beers} navigation={this.props.navigation} />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 17,
        color: Colors.titleColor,
        marginBottom: 10
    }
});