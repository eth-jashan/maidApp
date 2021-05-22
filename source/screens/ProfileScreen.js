import React from 'react';
import { useState,useCallback,useEffect } from 'react';
import {View,StyleSheet,Text,ActivityIndicator, SafeAreaView, Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {TextInput} from 'react-native-paper';

//actions
import * as manageActions from '../../store/action/ManageUser';

//icons
import { FontAwesome } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';


const ProfileScreen = props => {
    const[isLoading,setIsLoading] =useState(false);

    const dispatch = useDispatch();
    const user = useSelector(state=>state.manage.users);
    
    const loadUser = useCallback(async()=>{
        setIsLoading(true);
            console.log('start')
            await dispatch(manageActions.fetchUser())
                
            setIsLoading(false);
     },[dispatch])

     useEffect(()=>{
        loadUser();
    },[dispatch,loadUser])

    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus',loadUser);

        return () =>{
            willFocusSub.remove();
        }
   },[loadUser,dispatch])

  // console.log(user);


   if(isLoading){
    return(
        <View style={styles.centered}>
            <ActivityIndicator size='large' color='#e2703a'/>
        </View>
    )
    }
    if(!isLoading && Array.isArray(user) && user.length != 0){
        return(
            <SafeAreaView style={{height:Dimensions.get('window').height, 
            width:Dimensions.get('window').width}}>
                <ScrollView>
                    <View style={{padding:10}}>
                    <FontAwesome style={{alignSelf:'center',marginVertical:10}} name="user" size={90} color="#e2703a" />
                    <Button color='#eeb76b' compact={true} mode="contained" onPress={loadUser}>
                   Refresh
                    </Button>
                    <Button style={{margin:10}} color='orange' compact={true} mode="contained" onPress={()=>{props.navigation.navigate('Order')}}>
                   Your Orders
                    </Button>
                    </View>
                    <View>
                    <TextInput
                        mode='outlined'
                        style={styles.input}
                        value={user[0].name}
                        disabled={true}
                        theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                        label='Name'
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
    else{
            return(
                <View style={styles.centered}>
                    <ActivityIndicator size='large' color='#e2703a'/>
                </View>
            )
           
    }


};

const styles = StyleSheet.create({
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        width:Dimensions.get('window').width*0.85,
        margin:15,
        fontFamily:'bold',
        height:Dimensions.get('window').height*0.059,
        backgroundColor:'#ffffff',
        alignSelf:'center',
        position:'relative',
        borderRadius:10,
        fontSize:17
    }
});

ProfileScreen.navigationOptions = () => {
    return{
        header:()=>{
            return false
        }
    }
}

export default ProfileScreen;