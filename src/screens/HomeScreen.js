import React from "react"
import {StyleSheet, ActivityIndicator, Image, Text, Button, View} from "react-native";
import Colors from "../constants/Colors"
import BeerDetails from "../components/BeerDetails";
import {StackActions} from "react-navigation";
export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: false}
    }

    getRandomBeer = () => {
        this.setState({
            isLoading: true,
        });
        fetch('https://api.punkapi.com/v2/beers/random')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    beer: responseJson[0],
                });
                const pushAction = StackActions.push({
                    routeName: 'Details',
                    params: {
                        id: responseJson[0].id,
                    },
                });
                this.props.navigation.navigate(pushAction);

            })
            .catch((error) =>{
                alert("An error has occurred while fetching random beer");
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
            <View style={{flex: 1, paddingTop:20, alignItems: "center", justifyContent: "center"}}>
                <Text style={[styles.title, {marginBottom: 10}]}>Welcome to your new <Text style={{color: Colors.tintColor}}>beer</Text> library.</Text>
                <Text style={{textAlign: "center", color: Colors.textColor}}>Here you can find beers of any kind, filtering by degree for example or looking for a name.</Text>
                <Text style={{color: Colors.textColor}}>But for now, why not start by finding a random beer?</Text>
                <Text style={{color: Colors.textColor}}>And may be discovering a new one!</Text>
                <View style={[styles.separator, styles.container]} />
                <Button color={Colors.tintColor} title="Find Random Beer" onPress={() => this.getRandomBeer()}/>
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
    date: {
        fontWeight: "bold",
        color: "grey"
    },
    subline: {
        color: "grey"
    },
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    },
    subtitle: {
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 7,
        color: "#424242",
    },
    card: {
        elevation: 5,
        backgroundColor: "white",
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0.5 * 5 },
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * 5,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#424242',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
});