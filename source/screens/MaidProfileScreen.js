import React from 'react';
import {View,StyleSheet,Text,Button} from 'react-native';

const MaidProfileScreen = props => {
    return(
        <View>
            <Text>HomeScreen</Text>
        </View>
    );
};

MaidProfileScreen.navigationOptions = () => {
    return{
        header:()=>{
            return false
        }
    }
}

export default MaidProfileScreen;