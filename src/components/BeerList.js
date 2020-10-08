import React from 'react'
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Colors from "../constants/Colors";
import {StackActions} from "react-navigation";

export default class BeerList extends React.Component {
    constructor(props) {
        super(props);
    }

    _onPress = (id) => {
        const pushAction = StackActions.push({
            routeName: 'Details',
            params: {
                id: id,
            },
        });
        this.props.navigation.navigate(pushAction);
    };

    render() {
        if (this.props.beers !== undefined && this.props.beers.length > 0) {
            return (<FlatList
                style={{width:"100%", marginTop: 20}}
                data={this.props.beers}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => this._onPress(item.id)} style={[{flexDirection: "row"}, styles.container, styles.card]}>
                        <Image resizeMode={'contain'} style={{width: 100, height: 100 }} source={{ uri: item.image_url }} />
                        <View style={{ flex:1, height: 100, justifyContent: "space-around", flexDirection: "column"}}>
                            <Text style={styles.date}>{item.first_brewed} - <Text style={{color: Colors.tintColor}}>{item.abv}°</Text></Text>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.subline}>{item.tagline}</Text>
                        </View>
                    </TouchableOpacity>
                }
                keyExtractor={({ id }, index) => id.toString()}
            />)
        } else {
            return (<Text/>)
        }
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
