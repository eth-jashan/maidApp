import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {View,StyleSheet,Text,Dimensions,Alert,ActivityIndicator} from 'react-native';
import {Button} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context'

//components
import MaidList from '../component/maidList';

//actions
import * as manageActions from '../../store/action/ManageUser';

//icons
import { FontAwesome } from '@expo/vector-icons'; 
import { FlatList, ScrollView } from 'react-native-gesture-handler';


const HomeScreen = props => {

    const dispatch = useDispatch();
   

    const loadMaid = useCallback(async()=>{
            await dispatch(manageActions.fetchAllMaid())
            
     },[dispatch])

     const maid = useSelector(state=>state.manage.allmaids);
     console.log(maid);

      useEffect(()=>{
        loadMaid()
    },[dispatch,loadMaid])

    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus',loadMaid);

        return () =>{
            willFocusSub.remove();
        }
   },[loadMaid])

    if(Array.isArray(maid) && maid.length == 0){
        return(
            <View>
                <Text>No maids found withing your area</Text>
            </View>
            
        )
    }
    if(Array.isArray(maid) && maid.length != 0){
        return(
     
            <SafeAreaView>
                <FlatList
                    data={maid}
                    key={(_,i)=>i.toString()}
                    renderItem={({item}) => {
                        return(<View style={{width:Dimensions.get('window').width*0.9, backgroundColor:'white',borderRadius:10,alignSelf:'center',padding:8,marginVertical:10}}>
                        <Text style={{fontWeight:'bold', fontSize:20, marginVertical:8,alignSelf:"center"}}>{item.name}</Text>
                        <Text numberOfLines={1}>{item.address}</Text>
                        <FlatList
                            style={{ margin:12,alignSelf:"center"}}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={item.work}
                            keyExtractor={(_,i)=>i.toString()}
                            renderItem={({item}) =>{
                                return<View style={{backgroundColor:'purple', padding:8, borderRadius:8, width:150,}}>
                                    <Text style={{color:'white',alignSelf:'center'}}>{item}</Text>
                                </View>
                            }}
                        />
                        <Text style={{fontWeight:'600', fontSize:24,alignSelf:"center"}}>Starting from <Text style={{fontWeight:'bold',fontSize:24}}>₹ {item.price}</Text> </Text>
                        </View>)
                    }}
                />
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

HomeScreen.navigationOptions = () => {
    return{
        header:()=>{
            return false
        }
    }
}

const styles = StyleSheet.create({
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default HomeScreen;
//alignSelf:"center"