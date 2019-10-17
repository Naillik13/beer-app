import React from "react"
import {Text, TouchableOpacity, View, FlatList, Slider, ActivityIndicator, StyleSheet, Image} from "react-native";
import Colors from "../constants/Colors";
import BeerList from "../components/BeerList";

export default class AbvScreen extends React.Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: false}
    }

    getBeersByAbv = (abv) => {
        this.setState({
            isLoading: true
        })
        fetch('https://api.punkapi.com/v2/beers?abv_gt=' + abv)
            .then((response) => response.json())
            .then((responseJson) => {

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

    updateAbvUI = (abv) => {
        this.setState({
            abv: abv
        })
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
                <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Text style={styles.title}>ABV Selector</Text>
                    <Text style={{color: Colors.textColor, marginTop: 10}}>You will get all beers with an abv higher than the one selected</Text>
                    <Text style={{fontWeight: "bold", color: Colors.tintColor, marginTop:10}}>{this.state.abv !== undefined ? this.state.abv : "0.0"}</Text>
                    <Slider
                        step={.1}
                        value={this.state.abv !== undefined ? parseFloat(this.state.abv) : 0}
                        maximumValue={20}
                        style={{ width: 300 }}
                        onValueChange={value => this.updateAbvUI(parseFloat(value).toFixed(1))}
                        minimumTrackTintColor={Colors.tintColor}
                        onSlidingComplete={value => this.getBeersByAbv(parseFloat(value).toFixed(1))}
                    />
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