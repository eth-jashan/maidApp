import React from 'react';
import {View,Text,StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


const WorkCard = (props) => {
    return(
        <View style={{width:Dimensions.get('window').width*0.9, alignSelf:'center',borderRadius:15, backgroundColor:props.nego === 'nego'?'#f0af29':props.nego ==='accept'?'#009efd':'red', padding:15, marginVertical:10,elevation:5}}>
              <Text style={{alignSelf:'center',color:'white',fontWeight:'bold',fontSize:18}}>{props.name}</Text>
            {props.nego ==='accept'?<View style={{backgroundColor:'white',padding:5,borderWidth:1,borderColor:'white',borderRadius:10,margin:Dimensions.get('window').height*0.01}}>
            <Text>{props.phone}</Text>
          
            <Text>{props.address}</Text>
            </View>:null}
            
            <View style={{justifyContent:'center',alignItems:'center'}}>

            <Text style={{alignSelf:'center',color:'white',fontSize:14}}>From: {props.time} Till: {props.till}</Text>
            
            <FlatList 
             data={props.workArray}
             horizontal
             key={(_,i)=>i.toString()}
                    renderItem={({item}) => {
                        return <View style={{backgroundColor:'#3b3b3b',padding:7,borderRadius:10,marginHorizontal:5}}> 
                            <Text style={{color:'white'}}>{item}</Text>
                            </View>
                        
                    }}/>
            </View>
            
        </View>
    )
};

const styles = StyleSheet.create({});

export default WorkCard;