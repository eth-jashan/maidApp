import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {View,StyleSheet,Text,Dimensions,Alert,ActivityIndicator, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';
import {TextInput} from 'react-native-paper';

//components
import MaidList from '../component/maidList';

//actions
import * as manageActions from '../../store/action/ManageUser';

//icons
import { FontAwesome } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';


const HomeScreen = props => {

    const dispatch = useDispatch();
    const[workArray,setWorkArray] = useState([]);

    const loadMaid = useCallback(async()=>{
            await dispatch(manageActions.fetchAllMaid())
            if(maid.length !==0){
                setWorkArray(maid[0].work)
            }
            
     },[dispatch])

     const maid = useSelector(state=>state.manage.allmaids);
      console.log(maid);

      useEffect(()=>{
        loadMaid()
    },[dispatch,loadMaid])

    if(Array.isArray(maid) && maid.length == 0){
        return(
            <View>
                <Text>No maids found withing your area</Text>
            </View>
            
        )
    }

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