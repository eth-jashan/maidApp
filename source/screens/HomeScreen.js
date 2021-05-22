import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {View,StyleSheet,Text,Dimensions,Alert,ActivityIndicator, Modal} from 'react-native';
import {TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context'
import {Button} from 'react-native-paper'

//components
import MaidList from '../component/maidList';
import Hire from '../../components/Hire';
import SearchBar from '../../source/component/SearchBar';

//actions
import * as manageActions from '../../store/action/ManageUser';

//icons
import { FontAwesome } from '@expo/vector-icons'; 
import { FlatList, ScrollView } from 'react-native-gesture-handler';


const HomeScreen = props => {

    const dispatch = useDispatch();

    const[modalVisible,setModalVisible] = useState(false);
    const[maidData,setMaidData] = useState();
    const[term,setTerm] = useState('');
    
    const[maid,setMaid] = useState([]);
    const[isLoading,setIsLoading] = useState(false);
    const[done,setDone] = useState(false);
    

     
    const Maid =  useSelector(state=>state.manage.allmaids);
    
    useEffect(()=>{
        loadMaid()
    },[dispatch,loadMaid])

    const loadMaid = useCallback(async()=>{
        setIsLoading(true);
            await dispatch(manageActions.fetchAllMaid())
            setMaid(Maid);
            
        setIsLoading(false);
     },[dispatch])

    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus',loadMaid);

        return () =>{
            willFocusSub.remove();
        }
   },[loadMaid])




   const searchByCity = (city) => {
       console.log('orginal : ',maid);
       if(city===''){
        setMaid(Maid);
        setDone(false);
       }
       else{
           setIsLoading(true);
           
        let filteredMaid = maid.filter(ele => ele.address.includes(city))
        console.log('filtering')
        
        setMaid(filteredMaid);
        setDone(true)

        
        setIsLoading(false);
        console.log('\n\n\nFILTER',filteredMaid);

       }
       
      
   };

    if(!isLoading && Array.isArray(maid) && maid.length == 0){
        return(<SafeAreaView>
            <View>
            <SearchBar term={term}
            onTermChange={newTerm=>{setTerm(newTerm);searchByCity(term)}}
            onTermSubmit={()=>{setMaid(Maid);searchByCity(term)}}/>
              </View>
            <View>
                <Text style={{alignSelf:'center',justifyContent:'center',fontSize:17}}>No Maids Found</Text>
            </View>
            </SafeAreaView>
            
        )
    }
    if(!isLoading && Array.isArray(maid) && maid.length != 0){
        return(
            <SafeAreaView style={{flex:1}}>
                <View>
            <SearchBar term={term}
            onTermChange={newTerm=>{setTerm(newTerm);searchByCity(term)}}
            onTermSubmit={()=>{setMaid(Maid);searchByCity(term)}}/>
              </View>
                <FlatList
                    data={maid}
                    key={(_,i)=>i.toString()}
                    renderItem={({item}) => {
                        return(<View style={{width:Dimensions.get('window').width*0.9, backgroundColor:'#eeb76b',borderRadius:10,alignSelf:'center',padding:8,marginVertical:10}}>
                        <Text style={{fontWeight:'bold', fontSize:20, marginVertical:8,alignSelf:"center"}}>{item.name}</Text>
                        <Text numberOfLines={2}>{item.address}</Text>
                        <FlatList
                            style={{ margin:12,alignSelf:"center"}}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={item.work}
                            keyExtractor={(_,i)=>i.toString()}
                            renderItem={({item}) =>{
                                return<View style={{backgroundColor:'#e2703a', padding:8,margin:5, borderRadius:8, width:Dimensions.get('window').width*0.19}}>
                                    <Text style={{color:'white',alignSelf:'center',fontSize:15}}>{item}</Text>
                                </View>
                            }}
                        />
                        <Text style={{fontWeight:'600', fontSize:24,alignSelf:"center"}}>Starting from <Text style={{fontWeight:'bold',fontSize:24}}>₹ {item.price}</Text> </Text>
                        <Button 
                        style={{alignSelf:'center',width:Dimensions.get('window').width*0.2,margin:4}} 
                        color="#fa915f" mode="contained" onPress={()=>{setModalVisible(true);setMaidData(item);console.log(item)}}>Hire</Button>
                        </View>)
                    }}
                />
                <Modal animationType='slide' transparent={false} visible={modalVisible}>
                    <View>
                    <Hire maidData = {maidData} Submitted={()=>{setModalVisible(false)}}/>
                    <Button mode='contained' color="#dc143c" onPress={()=>{setModalVisible(false)}}>Cancel</Button>
                    </View>
                    
                </Modal>
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