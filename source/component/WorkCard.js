import React from 'react';
import {View,Text,StyleSheet, SafeAreaView, Dimensions, Alert} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import { useDispatch } from 'react-redux';

//actions
import * as manageWorkActions from '../../store/action/ManageWork';



const WorkCard = (props) => {


    const dispatch = useDispatch();

    return(
        <View style={{width:Dimensions.get('window').width*0.9, alignSelf:'center',borderRadius:15, backgroundColor:props.nego === 'nego'?'#f0af29':props.nego ==='accept'?'#00cc00':'#fa2a2a', padding:15, marginVertical:10,elevation:5}}>
              {props.who === 'maid'?<View>
              <Text style={{alignSelf:'center',color:'white',fontWeight:'bold',fontSize:24}}>{props.userName} </Text>
              </View>
              :
              <Text style={{alignSelf:'center',color:'white',fontWeight:'bold',fontSize:24}}>{props.name}</Text>}
            {props.nego ==='accept'?<View style={{backgroundColor:'white',padding:5,borderWidth:1,borderColor:'white',borderRadius:10,margin:Dimensions.get('window').height*0.01}}>
            {props.who === 'user'?<Text>{props.maidPhone}</Text>:<Text>{props.phone}</Text>}
          
            {props.who === 'user'?<Text>{props.maidAddress}</Text>:<Text>{props.address}</Text>}
            </View>:null}
            
            <View style={{justifyContent:'center',alignItems:'center'}}>

            <Text style={{alignSelf:'center',color:'white',fontSize:16,fontWeight:'700'}}>From: {props.time} Till: {props.till}</Text>
            
            <FlatList style={{margin:10}}
             data={props.workArray}
             horizontal
             key={(_,i)=>i.toString()}
                    renderItem={({item}) => {
                        return <View style={{backgroundColor:'#3b3b3b',padding:7,borderRadius:10,marginHorizontal:5}}> 
                            <Text style={{color:'white'}}>{item}</Text>
                            </View>
                        
                    }}/>
            <Text style={{alignSelf:'center',color:'#3b3b3b',fontWeight:'bold',fontSize:30,fontStyle:'italic'}}>₹{props.price}/month</Text>
            </View>
            {props.who === 'maid' && props.nego === 'nego'?<View style={{padding:10,justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
            <Button mode="contained" color='green' onPress={() => {dispatch(manageWorkActions.statusHandler('accept',props.Id))}}>Accept </Button>
            <Button mode="contained" color='#cf1b1b' onPress={() => {dispatch(manageWorkActions.statusHandler('decline',props.Id))}}>Decline </Button>
 
                
            </View>:null}
            
        </View>
    )
};

const styles = StyleSheet.create({});

export default WorkCard;