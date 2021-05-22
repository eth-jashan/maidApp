import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

//actions
import * as manageWorkActions from '../../store/action/ManageWork';

//component
import WorkCard from '../component/WorkCard';

const OrderScreen = (props) => {
    const dispatch = useDispatch();
    const[isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        loadWork()
    },[dispatch,loadWork])

    const loadWork = useCallback(async()=>{
        setIsLoading(true);
            await dispatch(manageWorkActions.fetchWork())

            
        setIsLoading(false);
     },[dispatch])

    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus',loadWork);

        return () =>{
            willFocusSub.remove();
        }
   },[loadWork])

    const orders =  useSelector(state=>state.work.work);
    console.log(orders)

    return(
        <View>
            <FlatList data={orders}
                    key={(_,i)=>i.toString()}
                    renderItem={({item}) => {
                        return <View> 
                            <WorkCard time={item.time} till={item.toTime} name={item.maidName} 
                            address = {item.address} phone={item.phone} workArray={item.chipWork} 
                            nego={item.nego} who = 'user' userName={item.name} Id={item.id} maidPhone ={item.maidPhone} maidAddress = {item.maidAddress}
                            price = {item.basePrice} /> 
                            </View>
                        
                    }}/>  
             
        </View>
    )
};

const styles = StyleSheet.create({});

export default OrderScreen;