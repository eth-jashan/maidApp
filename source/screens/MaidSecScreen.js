import React from 'react';
import {View,Button,Modal,Text} from 'react-native';
import {TextInput} from 'react-native-paper';

//component
import Profile from '../../components/Profile';
const MaidSecScreen = props => {
    return(
        <Profile/>
    )
}

MaidSecScreen.navigationOptions = () => {
    return{
        header:()=>{
            return false
        }
    }
}

export default MaidSecScreen;