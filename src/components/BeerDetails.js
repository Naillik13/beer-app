import React from 'react'
import {Image, StyleSheet, Text, View} from "react-native";
import Colors from "../constants/Colors";

export default class BeerDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beer: props.beer,
        }
    }

     render() {
         return (
             <View>
                 <View style={[{flexDirection: "row", alignItems: "center"}, styles.container, styles.card]}>
                     <Image resizeMode={'contain'} style={{ alignSelf: "center", width: 100, height: 100 }} source={{ uri: this.state.beer.image_url }} />
                     <View style={{flex:1, height: 100, justifyContent: "space-around", flexDirection: "column"}}>
                         <Text style={styles.date}>{this.state.beer.first_brewed} - <Text style={{color: Colors.tintColor}}>{this.state.beer.abv}°</Text></Text>
                         <Text style={styles.title}>{this.state.beer.name}</Text>
                         <Text style={styles.subline}>{this.state.beer.tagline}</Text>
                     </View>
                 </View>
                 <View style={styles.container}>
                     <Text style={[styles.title, {marginBottom: 10}]}>Some informations about the <Text style={{color: Colors.tintColor}}>{this.state.beer.name}</Text></Text>
                     <Text style={{color: Colors.textColor}}>{this.state.beer.description}</Text>
                     <Text style={styles.subtitle}>Brewers tips</Text>
                     <Text style={{color: Colors.textColor}}>{this.state.beer.brewers_tips}</Text>
                     <Text style={styles.subtitle}>Want to eat ?</Text>
                     <Text style={{color: Colors.titleColor, marginBottom:3}}>You can try our next <Text style={{color: Colors.tintColor}}>suggestions</Text></Text>
                     {this.state.beer.food_pairing.map(food => (
                         <Text key={food} style={{color: Colors.textColor}}>- {food}</Text>
                     ))}
                 </View>
             </View>
         )
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