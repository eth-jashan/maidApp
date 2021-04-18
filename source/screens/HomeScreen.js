import React from 'react';
import {View,StyleSheet,Text,Button} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import MaidList from '../component/maidList';


const HomeScreen = props => {
    return(
        <View>
            <MaidList/>
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