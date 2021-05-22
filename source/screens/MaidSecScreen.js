import React from 'react';
import {View,Button,Modal,Text,StyleSheet,ActivityIndicator, SafeAreaView} from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//actions
import * as manageActions from '../../store/action/ManageUser';
import * as manageWorkActions from '../../store/action/ManageWork';

//component
import Profile from '../../components/Profile';
import { FlatList } from 'react-native-gesture-handler';
import WorkCard from '../component/WorkCard';

const MaidSecScreen = props => {

     const[isLoading,setIsLoading] =useState(false);
     const dispatch = useDispatch();

     const loadMaid = useCallback(async()=>{
         setIsLoading(true);
             await dispatch(manageActions.fetchMaid())
             await dispatch(manageWorkActions.fetchMaidWork())
             setIsLoading(false);
      },[dispatch])

     const maid = useSelector(state=>state.manage.maids);
     const orders =  useSelector(state=>state.work.work);
    //  console.log(orders)
     


    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus',loadMaid);

        return () =>{
            willFocusSub.remove();
        }
   },[loadMaid])

      useEffect(()=>{
          loadMaid()
      },[dispatch,loadMaid])


    
     if(isLoading){
         return(
             <View style={styles.centered}>
                 <ActivityIndicator size='large' color='#e2703a'/>
             </View>
         )
     }
    

      if(!isLoading && Array.isArray(maid) && maid.length == 0){
          return(
              <Profile/>
          )
      }
      else if(!isLoading && Array.isArray(maid) && maid.length){
          
     return(<SafeAreaView>
        <View style={{padding:15}}>
            <View style={styles.container}><Text style={styles.text}>Welcome Back <Text style={{color:'white'}}>{maid[0].name}</Text></Text></View>
             <View><Text style={styles.text}>Your Work:</Text></View>
        </View>
        <View>
            <FlatList data={orders}
                    key={(_,i)=>i.toString()}
                    renderItem={({item}) => {
                        return <View> 
                             <WorkCard time={item.time} till={item.toTime} name={item.maidName} 
                            address = {item.address} phone={item.phone} workArray={item.chipWork} 
                            nego={item.nego} who = 'maid' userName={item.name} Id={item.id}
                            price = {item.basePrice}/> 
                            </View>
                        
                    }}/>  
             
        </View>
        </SafeAreaView>
    )
      }

      return(<View>
          <Text>Error Occured</Text>
      </View>)

     


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
    },
    text:{
        fontWeight:'bold',
        fontSize:20
    },
    container:{
        padding:20,
        backgroundColor:'#e2703a',
        marginVertical:10,
        borderRadius:10
    }
});

export default MaidSecScreen;