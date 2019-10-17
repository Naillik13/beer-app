import React from "react"
import {Text, View, FlatList, ActivityIndicator} from "react-native";
import BeerDetails from "../components/BeerDetails";

export default class DetailsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
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
            <View style={{flex: 1, paddingTop:20}}>
                <BeerDetails beer={this.state.beer}/>
            </View>
        );
    }

}

