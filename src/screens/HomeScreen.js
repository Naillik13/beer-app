import React from "react"
import {StyleSheet, ActivityIndicator, Image, Text, Button, View} from "react-native";

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
                }, function(){

                });

            })
            .catch((error) =>{
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
        } else if (this.state.beer !== undefined){
            return(
                <View style={{flex: 1, paddingTop:20}}>
                    <View style={[{flexDirection: "row", alignItems: "center"}, styles.container, styles.card]}>
                        <Image resizeMode={'contain'} style={{ alignSelf: "center", width: 100, height: 100 }} source={{ uri: this.state.beer.image_url }} />
                        <View style={{flex:1, height: 100, justifyContent: "space-around", flexDirection: "column"}}>
                            <Text style={styles.date}>{this.state.beer.first_brewed} - <Text style={{color:"#739340"}}>{this.state.beer.abv}°</Text></Text>
                            <Text style={styles.title}>{this.state.beer.name}</Text>
                            <Text style={styles.subline}>{this.state.beer.tagline}</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={[styles.title, {marginBottom: 10}]}>Some informations about the <Text style={{color: "#739340"}}>{this.state.beer.name}</Text></Text>
                        <Text style={{color: "#666666"}}>{this.state.beer.description}</Text>
                        <Text style={styles.subtitle}>Brewers tips</Text>
                        <Text style={{color: "#666666"}}>{this.state.beer.brewers_tips}</Text>
                        <Text style={styles.subtitle}>Want to eat ?</Text>
                        <Text style={{color: "#383838", marginBottom:3}}>You can try our next <Text style={{color: "#739340"}}>suggestions</Text></Text>
                        {this.state.beer.food_pairing.map(food => (
                            <Text key={food} style={{color: "#666666"}}>- {food}</Text>
                        ))}
                    </View>
                    <View style={[styles.separator, styles.container]} />
                    <Button color="#739340" title="Find Another Beer" onPress={() => this.getRandomBeer()}/>
                </View>
            );
        }

        return(
            <View style={{flex: 1, paddingTop:20}}>
                <Button title="Random Beer" onPress={() => this.getRandomBeer()}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 17,
        color: "#383838"
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