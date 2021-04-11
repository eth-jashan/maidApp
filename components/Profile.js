import React from 'react';
import { useState } from 'react';
import {View,Button,Modal,Text, SafeAreaView,StyleSheet, Dimensions,TouchableOpacity,ActivityIndicator, Alert} from 'react-native';
import {TextInput} from 'react-native-paper';

import TimePicker from 'react-native-modal-datetime-picker';

//icons
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
//components 
import RNPickerSelect from 'react-native-picker-select';
import { FlatList, ScrollView } from 'react-native-gesture-handler';




const Profile = props => {
    const[name,setName] = useState('');
    const[phone,setPhone] = useState('');
    const[address,setAdress] = useState('');
    const[time,setTime] = useState('');
    const[toTime,setToTime] = useState('');
    const[basePrice,setBasePrice] = useState('');
    const[work,setWork] = useState('');
    const[workArray,setWorkArray] = useState([]);
   
    const[clockVisible,setClockVisible] = useState(false);
    const[Visible,setVisible] = useState(false);
    const[modalVisible,setModalVisible] = useState(false);

    const[load,setLoad] =  useState(false)
    

    const addWork = () => {
        if(workArray.includes(work)){
            Alert.alert('Already Exists','The Work is already chosen',[{text:'Okay',onPress:()=>setModalVisible(false)}])
        }  
        else{
            setWorkArray(currentWork =>[...currentWork,work]);
            console.log(workArray);
            setModalVisible(false);
            setWork(null);
        }

    };

    const cancelWork = () => {
        setModalVisible(false);
        setWork(null);
    };



    const reset = () => {
        setName('');setPhone('');setAdress('');setTime('');setToTime('');
        setClockVisible(null);setVisible(null);setModalVisible(null);
        setLoad(false);setWorkArray([]);setBasePrice(null);
        console.log(name,phone,address,time,toTime)
    };

    const validate = () => {
        if(name.trim().length > 0 && phone.trim().length > 0  && time.trim().length > 0 &&
          toTime.trim().length > 0 && basePrice.trim().length > 0 && workArray.length!=0 ){
            console.log('work')
            
        }
        else{
            Alert.alert('Invalid Form Data','Please Enter all The required Data',[{text:'Okay'}])
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
        <SafeAreaView styles={styles.maincontainer} >
            <ScrollView>
            <View style={{width:Dimensions.get('window').width, alignSelf:'center'} }>
            <View style={{margin:10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{margin:30,color:'#e2703a',fontSize:25,fontWeight:'bold'}} >Maid Registration</Text>
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
                keyboardType='phone-pad'
                onChangeText={text=>setPhone(text)}
                theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                label='Phone No. 91+'
                />
                 <TextInput
                mode='outlined'
                style={styles.input}
                value={address}
                onChangeText={text=>setAdress(text)}
                theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                label='Enter Address(Optional)'
                />
                 <TextInput
                mode='outlined'
                style={styles.input}
                value={basePrice}
                keyboardType='phone-pad'
                onChangeText={text=>setBasePrice(text)}
                theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                label='Your Base Price'
                />
            </View>
            {/* clock 1 */}
            <View style={{flexDirection:'row'}} >
            <View >
            <TextInput
                disabled={true}
                mode='flat'
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
                mode='flat'
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
            <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
   {/* ARRAY OF WORK */}
                {workArray.map((kaam) => <View style={{borderWidth:1,marginHorizontal:5,padding:5,borderRadius:10}}>
                    <Text key={kaam} style={{fontWeight:'bold',margin:2}}>{kaam}</Text>
                    </View>)}
                {workArray.length!=0?<Feather style={{margin:5}} name="delete" size={23} color="red"  onPress={()=>{setWorkArray([])}}/>:null}
            </View>
            <TouchableOpacity  style={styles.button}  onPress={()=>setModalVisible(true)}>
                {load?<ActivityIndicator color='#ffffff' size='small'/>:
                    <Text style={{fontWeight:'bold',fontSize:17,color:'#ffffff',textAlign:'center'}} >Select Work</Text>}
                    
            </TouchableOpacity>
            <TouchableOpacity  style={styles.button}  onPress={()=>{}}>
                {load?<ActivityIndicator color='#ffffff' size='small'/>:
                    <Text style={{fontWeight:'bold',fontSize:17,color:'#ffffff',textAlign:'center'}} >Sync Location</Text>}
            </TouchableOpacity>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity  style={styles.buttonDisagree}  onPress={()=>{reset()}}>
                            <Text style={{fontWeight:'bold',fontSize:17,color:'#ffffff',textAlign:'center'}} >Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={styles.buttonAgree}  onPress={validate}>
            <Text style={{fontWeight:'bold',fontSize:17,color:'#ffffff',textAlign:'center'}} >Submit</Text>
            </TouchableOpacity>
            </View>

            </View>
            </View>
            <Modal animationType='fade' transparent={true} visible={modalVisible}>
                <View style={{flex: 1,justifyContent: "center",alignItems: "center",marginTop: 22}}>
                    <View style={styles.modal}>
                        
                        <RNPickerSelect
                        onValueChange={(value) => setWork(value)}
                        items={[
                         { label: 'House Cleaning', value: 'House Cleaning' },
                         { label: 'Vehicle Wash', value: 'Vehicle Wash' },
                         { label: 'Cooking', value: 'Cooking' },
                              ]}
                              style={{ inputAndroid: { color: 'black' } }}
                        useNativeAndroidPickerStyle={true}
                        fixAndroidTouchableBug={true}
                        Icon={() => {
                            return <MaterialCommunityIcons name="broom" size={24} color="black" />;
                          }}/>
                          <View style={{flexDirection:'column',justifyContent:'center'}} >
                          {work?<TouchableOpacity  style={styles.buttonDone}  onPress={addWork}>
                            <Text style={{fontWeight:'bold',fontSize:17,color:'#ffffff',textAlign:'center'}} >Done</Text>
                        </TouchableOpacity>:null}
                              <TouchableOpacity  style={styles.buttonDisagree}  onPress={cancelWork}>
                            <Text style={{fontWeight:'bold',fontSize:17,color:'#ffffff',textAlign:'center'}} >Cancel</Text>
                        </TouchableOpacity>

                        </View>
                        
            
                    </View>
                </View>
            </Modal>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    maincontainer:{
        height:Dimensions.get('window').height, 
        width:Dimensions.get('window').width
             
    },
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
    },
    button:{
        borderRadius:20,
        backgroundColor:'#e2703a',
        width:Dimensions.get('window').width*0.70,
        margin:10,
        padding:10,
        alignSelf:'center',
        position:'relative'

    },
    modal:{
        borderRadius:20,
        backgroundColor:'#ffffff',
        margin:10,
        justifyContent:'center',
        width:Dimensions.get('window').width*0.8,
        
        padding:20,
        borderWidth:1,
        borderColor:'black'
    },
    buttonFinal:{
        borderRadius:20,
        backgroundColor:'#e2703a',
        width:Dimensions.get('window').width*0.40,
        margin:10,
        padding:10,
        alignSelf:'center',
        position:'relative'
    },
    buttonAgree:{
        borderRadius:20,
        backgroundColor:'green',
        width:Dimensions.get('window').width*0.40,
        margin:10,
        padding:10,
        alignSelf:'center',
        position:'relative'
    },
    buttonDisagree:{
        borderRadius:20,
        backgroundColor:'black',
        width:Dimensions.get('window').width*0.40,
        margin:10,
        padding:10,
        alignSelf:'center',
        position:'relative'
    },
    buttonDone:{
        borderRadius:20,
        backgroundColor:'#e2703a',
        width:Dimensions.get('window').width*0.40,
        margin:10,
        padding:10,
        alignSelf:'center',
        position:'relative'
    }
});

export default Profile;