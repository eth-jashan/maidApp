import React from 'react';
import {View,StyleSheet,Text, Button} from 'react-native';

const ProfileScreen = props => {
    return(
        <View>
            <Text>ProfileScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

ProfileScreen.navigationOptions = () => {
    return{
        header:()=>{
            return false
        }
    }
}

export default ProfileScreen;