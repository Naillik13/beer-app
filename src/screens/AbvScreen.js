import React from "react"
import {Text, TouchableOpacity, View, FlatList, Slider, ActivityIndicator, StyleSheet, Image} from "react-native";
import Colors from "../constants/Colors";
import {StackActions} from "react-navigation";

export default class AbvScreen extends React.Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: false}
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
                console.error(error);
            });
    };
    getBeersUI = () => {
        if (this.state.beers !== undefined) {
            return (<FlatList
                style={{width:"100%", marginTop: 20}}
                data={this.state.beers}
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
        }
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
                        value={this.state.abv !== undefined ? this.state.abv : 0}
                        maximumValue={20}
                        style={{ width: 300 }}
                        onValueChange={value => this.updateAbvUI(parseFloat(value).toFixed(1))}
                        minimumTrackTintColor={Colors.tintColor}
                        onSlidingComplete={value => this.getBeersByAbv(parseFloat(value).toFixed(1))}
                    />
                </View>
                {this.getBeersUI()}
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
        color: "grey",
        width: "100%"
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
        shadowOffset: {width: 0, height: 0.5 * 5},
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * 5,
    }
});