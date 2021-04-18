import React from 'react';
import {ActivityIndicator,View,StyleSheet} from 'react-native';

const CheckScreen = (props) => {
    return(
        <View style={styles.centered}>
            <ActivityIndicator size='large' color='#e2703a'/>
        </View>
    )
};

const styles = StyleSheet.create({
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})