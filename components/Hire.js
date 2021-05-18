import React from 'react';
import { useState } from 'react';
import {View,StyleSheet,Button,Text, Dimensions, SafeAreaView,FlatList,TouchableOpacity} from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';

import TimePicker from 'react-native-modal-datetime-picker';
import { Chip } from 'react-native-paper';

//icons
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { useCallback } from 'react';

const Hire = (props) => {
    const { chipKey, value, chipPressed, sel } = props;
    const[name,setName] = useState('');
    const[phone,setPhone] = useState('');
    const[time,setTime] = useState('');
    const[toTime,setToTime] = useState('');

    const[clockVisible,setClockVisible] = useState(false);
    const[Visible,setVisible] = useState(false);
    const[chipSelect,setChipSelect] = useState([]);
    const[Styles,setStyle] = useState(['#cccccc','#cccccc','#cccccc']);
    const[chipId,setChipId] = useState([]);
    const[chipWork,setChipWork] = useState([]); 
    const[chipBool,setChipBool] = useState([false,false,false]);

    const[load,setLoad] =  useState(false);
    const[loader,setLoader] = useState(false);

    //  const {workArray} = props;
    console.log(props.workArray)

    
    const chipCheck =(index,kaam) => {
        if(chipId.includes(index)){
            var i = chipId.indexOf(index);
            chipId.splice(i,1);
            chipWork.splice(i,1)
            
            chipBool.splice(i,1,false)

            
        }
        else{
            chipId.push(index)
            chipWork.push(kaam)
            
            chipBool.splice(index,1,true)
        }
    }

    const showTimePicker = () =>{
        setClockVisible(true);
    };
    const hideTimePicker = () => {
        setClockVisible(false);
    };
    const showPicker = () => {
        setVisible(true);
    };
    const hidePicker = () => {
        setVisible(false);
    };
    const timeConfirm = (time) =>{
        const h=time.getHours();
        const m = time.getMinutes();
        const timeNow = h + ':' + m
        setTime(timeNow);
        hideTimePicker();
    };
    const timeTillConfirm = (time) =>{
        const h=time.getHours();
        const m = time.getMinutes();
        const timeNow = h + ':' + m
        setToTime(timeNow);
        hidePicker();
    };

    return(
        <SafeAreaView >
        <ScrollView keyboardShouldPersistTaps={true}>
            <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{alignSelf:'center',color:'#e2703a',fontSize:25,fontWeight:'bold',padding:15}} >Hiring Form</Text>
            <View>
               <TextInput
                mode='outlined'
                style={styles.input}
                value={name}
                onChangeText={text=>setName(text)}
                theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                label='Enter Name'
                />
                <TextInput
                mode='outlined'
                style={styles.input}
                value={phone}
                onChangeText={text=>setPhone(text)}
                theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                label='Enter Phone No.'
                />
                <Text>Select From Available Services:</Text>
                <View style={{flexDirection:'row'}}>
                {props.maidData.work.map((kaam,index)=>       
                    <View style={{margin:1}}>
                    {/* <TouchableOpacity  onPress={()=>{chipCheck(index);console.log(chipId);console.log(Styles)}}>
                        <View style={{height:30,width:100,borderRadius:10,borderColor:'black',borderWidth:1,backgroundColor:Styles[index]}}><Text style={{alignSelf:'center'}}>{kaam}</Text></View>
                    </TouchableOpacity> */}
                    {/* <Chip  icon='broom' textStyle={{ color:'white', fontSize: 15 }} style={{ backgroundColor:Styles[index] }}  onPress={() =>{chipCheck(index);console.log(chipId);console.log(Styles)}}>{kaam}</Chip> */}
                    <Chip  icon='broom' textStyle={{ color:'white', fontSize: 15 }} 
                    style={{ backgroundColor:Styles[index] }}  
                    onPress={() =>{chipCheck(index,kaam);console.log(chipId);
                    console.log(Styles);console.log(chipWork);console.log(Styles[index]);}}>{kaam}</Chip>
                    
                    </View>)}
                </View>


                </View>
                
                {/* clock 1 */}
            <View style={{flexDirection:'row'}} >
            <View >
            <TextInput
                disabled={true}
                mode='outlined'
                style={styles.timeInput}
                value={time}
                theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                label='Available From'
                />
            </View>
            <View style={{padding:Dimensions.get('window').width*0.05}}>
            <AntDesign name="clockcircle" size={30} color="green"  onPress={showTimePicker}/>
                <TimePicker
                isVisible={clockVisible}
                mode='time'
                onConfirm={timeConfirm}
                onCancel={hideTimePicker}
                />
            </View>
            
            </View>
                        {/* clock 2 */}
                        <View style={{flexDirection:'row'}} >
            <View >
            <TextInput
                disabled={true}
                mode='outlined'
                style={styles.timeInput}
                value={toTime}
                theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                label='Available Till'
                />
            </View>
            <View style={{padding:Dimensions.get('window').width*0.05}}>
            <AntDesign name="clockcircle" size={30} color="black"  onPress={showPicker}/>
                <TimePicker
                isVisible={Visible}
                mode='time'
                onConfirm={timeTillConfirm}
                onCancel={hidePicker}
                />
            </View>
            
            </View>
            
            </View>
        </ScrollView>
        </SafeAreaView>


    )
}

Hire.navigationOptions = () => {
    return{
        header:()=>{
            return false
        }
    }
}

const styles = StyleSheet.create({
    input:{
        width:Dimensions.get('window').width*0.85,
        margin:15,
        fontFamily:'bold',
        height:Dimensions.get('window').height*0.056,
        backgroundColor:'#ffffff',
        alignSelf:'center',
        position:'relative',
        borderRadius:10,
        fontSize:17
    },
    timeInput:{
        width:Dimensions.get('window').width*0.68,
        margin:15,
        fontFamily:'bold',
        height:Dimensions.get('window').height*0.056,
        backgroundColor:'#ffffff',
        alignSelf:'center',
        position:'relative',
        borderRadius:10,
        fontSize:17 
    }
});

export default Hire;