import React from 'react';
import {View,StyleSheet,Text,Button} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';


const HomeScreen = props => {
    return(
        <View>
            <Text>HomeScreen</Text>
        </View>
    );
};

HomeScreen.navigationOptions = () => {
    return{
        header:()=>{
            return false
        }
    }
}

const styles = StyleSheet.create({});

export default HomeScreen;