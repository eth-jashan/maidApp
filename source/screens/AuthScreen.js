import React from 'react';
import {View,StyleSheet,Text,Button} from 'react-native';

const AuthScreen = props => {
    return(
        <View>
            <Text>AuthScreen</Text>
            <Button title="Login" onPress={()=>{props.navigation.navigate('Main')}}/>
        </View>
    );
};

const styles = StyleSheet.create({});

export default AuthScreen;