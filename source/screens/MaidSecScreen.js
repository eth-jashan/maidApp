import React from 'react';
import {View,Button,Modal,Text,StyleSheet,ActivityIndicator} from 'react-native';
import {TextInput} from 'react-native-paper';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//actions
import * as manageActions from '../../store/action/ManageUser';

//component
import Profile from '../../components/Profile';

const MaidSecScreen = props => {

     const[isLoading,setIsLoading] =useState(false);
     const dispatch = useDispatch();

     const loadMaid = useCallback(async()=>{
             await dispatch(manageActions.fetchMaid())
      },[dispatch,setIsLoading])

     const maid = useSelector(state=>state.manage.maids);
     console.log('********',maid);

      useEffect(()=>{
          const willFocusSub = props.navigation.addListener('willFocus',loadMaid);

          return () =>{
              willFocusSub.remove();
          }
     },[loadMaid])

    //  useEffect(()=>{
    //      loadMaid()
    //  },[dispatch,loadMaid])


    
     if(isLoading){
         return(
             <View style={styles.centered}>
                 <ActivityIndicator size='large' color='#e2703a'/>
             </View>
         )
     }
    

      if(!isLoading && maid.length === 0){
          return(
              <Profile/>
          )
      }

     return(
         <View>
             
             <Text>{maid.address}</Text>
         </View>
     )
     


}



MaidSecScreen.navigationOptions = () => {
    return{
        header:()=>{
            return false
        }
    }
}


const styles= StyleSheet.create({
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default MaidSecScreen;