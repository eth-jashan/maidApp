import React from 'react';
import { useState } from 'react';
import {View,Button,Modal,Text, SafeAreaView,StyleSheet, Dimensions,TouchableOpacity,ActivityIndicator, Alert} from 'react-native';
import {TextInput} from 'react-native-paper';

import TimePicker from 'react-native-modal-datetime-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

//icons
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
//components 
import RNPickerSelect from 'react-native-picker-select';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

//api
import LocationApi from '../api/LocationApi'; //not using
import GoogleLocationApi from '../api/GoogleLocationApi';

//actions
import * as manageActions from '../store/action/ManageUser';
import { useDispatch } from 'react-redux';

const Profile = props => {

    const dispatch = useDispatch();

    const[name,setName] = useState('');
    const[phone,setPhone] = useState('');
    const[address,setAdress] = useState('');
    const[time,setTime] = useState('');
    const[toTime,setToTime] = useState('');
    const[basePrice,setBasePrice] = useState('');
    const[work,setWork] = useState('');
    const[gloading,setGloading] = useState(false);

    const[loc,setLoc] = useState('');
    const[workArray,setWorkArray] = useState([]);
    const[isLocated,setIsLocated] = useState(false);

   
    const[clockVisible,setClockVisible] = useState(false);
    const[Visible,setVisible] = useState(false);
    const[modalVisible,setModalVisible] = useState(false);

    const[load,setLoad] =  useState(false);
    const[loader,setLoader] = useState(false);

    const revereGeoCodeResponse = async(latitude,longitude) =>{
        try{
            const response = await GoogleLocationApi.get(`geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDsDKH-37DS6ZnGY_oIi7t5YE0oAAZ-V88`)
            //console.log(response.data);
            const address =  response.data.results[0].formatted_address;
            //setLoc(JSON.stringify( response.data.results[0].geometry.location))
            const loc = JSON.stringify(response.data.results[0].address_components) ;
           
 
            console.log('*************************',address);
            setAdress(address);
            setLoc(loc)
            console.log('*************************',loc);
        }
        catch{
            console.log('error!')
        }
    }

    
     const requestLocation = () => {
         setGloading(true);
         
             navigator.geolocation.getCurrentPosition(
                position =>{
                    const LOCATION = position
                    const location = JSON.stringify(position);
                    console.log('*****yooo',location)
                    setIsLocated(true)
                    setGloading(false)
                    
            
                    revereGeoCodeResponse(LOCATION.coords.latitude,LOCATION.coords.longitude)
                   
                },

                error=>Alert.alert(error.message),setIsLocated(false),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
           

         
         
        
     };


    const addWork = () => {
        if(workArray.includes(work)){
            Alert.alert('Already Exists','The Work is already chosen',[{text:'Okay',onPress:()=>{setModalVisible(false);setWork(null)}}])
        }
        else if(workArray.length === 4){
            Alert.alert('Exceeded Limit','Sorry, you cannot apply for more than 4 works',[{text:'Okay',onPress:()=>{setModalVisible(false);setWork(null)}}])
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
        setLoc('');setIsLocated(false);
    };

    const validate = async() => {
        if(loc.trim()==0){
            Alert.alert('Sync Location','Please Obtain your Location',[{text:'Okay'}])
        }
       // console.log(name,phone,time,toTime,basePrice,workArray,address);
        else if(name.trim().length > 0 && phone.trim().length > 0  && time.trim().length > 0 &&
          toTime.trim().length > 0 && basePrice.trim().length > 0 && workArray.length!=0 
          && address.trim().length>0)
          { 
            setLoader(true);
            await dispatch(manageActions.createMaid(name,phone,basePrice,time,toTime,workArray,loc,address));
            console.log('dispatched')
            setLoader(false);
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
            <ScrollView keyboardShouldPersistTaps={true}>
            <View style={{width:Dimensions.get('window').width, alignSelf:'center'} }>
            <View style={{margin:10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{margin:30,color:'#e2703a',fontSize:25,fontWeight:'bold',textDecorationLine:'underline'}} >Maid Registration</Text>
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
            <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row',width:'100%'}}>
   {/* ARRAY OF WORK */}
                {workArray.map((kaam) => <View key={workArray.indexOf(kaam)} style={{borderWidth:1,marginHorizontal:5,padding:5,borderRadius:10}}>
                    <Text  style={{fontWeight:'bold',margin:2}}>{kaam}</Text>
                    </View>)}
                {workArray.length!=0?<Feather style={{margin:5}} name="delete" size={23} color="red"  onPress={()=>{setWorkArray([])}}/>:null}
            </View>

            <GooglePlacesAutocomplete
             placeholder='Search Your Location(Optional)'
             fetchDetails={true}
             styles={Gstyles}
        
            onPress={(data, details) => {
                setAdress('');
                setIsLocated(false);
                
               // 'details' is provided when fetchDetails = true
             const loc = JSON.stringify(details.address_components);
             const address = details.formatted_address;
             setLoc(loc);
             setAdress(address);
             // console.log(details)
             //console.log(loc)
            }}
            query={{
                   key: 'AIzaSyDsDKH-37DS6ZnGY_oIi7t5YE0oAAZ-V88',
                   language: 'en',
            }}
           />
            
            <TouchableOpacity  style={styles.button}  onPress={()=>setModalVisible(true)}>
                {load?<ActivityIndicator color='#ffffff' size='small'/>:
                    <Text style={{fontWeight:'bold',fontSize:17,color:'#ffffff',textAlign:'center'}} >Select Work</Text>}
                    
            </TouchableOpacity>
        


             <TouchableOpacity  style={styles.button}  onPress={requestLocation}>
                {gloading?<ActivityIndicator color='#ffffff' size='small'/>:
                    <Text style={{fontWeight:'bold',fontSize:17,color:'#ffffff',textAlign:'center'}} >{!isLocated?' Get Current Location':'Located'}</Text>}
            </TouchableOpacity>
            
            

            <TextInput
                mode='outlined'
                style={styles.input}
                value={address}
                onChangeText={text=>setAdress(text)}
                theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                label='Address'
                />

            <View style={{flexDirection:'row'}}>
            <TouchableOpacity  style={styles.buttonDisagree}  onPress={()=>{reset()}}>
                            <Text style={{fontWeight:'bold',fontSize:17,color:'#ffffff',textAlign:'center'}} >Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={styles.buttonAgree}  onPress={validate}>
            {loader?<ActivityIndicator color='#ffffff' size='small'/>:<Text style={{fontWeight:'bold',fontSize:17,color:'#ffffff',textAlign:'center'}} >Submit</Text>}
            </TouchableOpacity>
            </View>

            </View>
            </View>
            <Modal animationType='fade' transparent={true} visible={modalVisible}>
                <View style={{flex: 1,justifyContent: "center",alignItems: "center",marginTop: 22}}>
                    <View style={styles.modal}>
                        <View style={{width:'100%'}}>
                        <RNPickerSelect
                            
                        onValueChange={(value) => setWork(value)}
                        items={[
                         { label: 'House Cleaning', value: 'House Cleaning' },
                         { label: 'Vehicle Wash', value: 'Vehicle Wash' },
                         { label: 'Cooking', value: 'Cooking' },
                         { label: 'Gardening', value: 'Gardening' },
                         { label: 'Pet Sitting', value: 'Pet Sitting' },
                         { label: 'Baby Sittin', value: 'Baby Sitting' }
                              ]}
                              style={{ inputAndroid: { color: 'black' } }}
                        useNativeAndroidPickerStyle={true}
                        fixAndroidTouchableBug={false}
                        Icon={() => {
                            return <MaterialCommunityIcons name="broom" size={24} color="black" />;
                          }}/>
                          </View>
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

const Gstyles = StyleSheet.create({
    textInputContainer:{
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth:0,
        zIndex:999,
        width:'90%',
        alignSelf:'center',
        marginTop:10
    },
    textInput: {
        marginLeft: 0,
        marginRight: 0,
        height: 45,
        color: '#5d5d5d',
        fontSize: 18,
        borderWidth:1,
        zIndex:999,
      },
      predefinedPlacesDescription: {
        color: '#1faadb'
      },
      separator:{
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#ad552b',
      },
      description:{
        flexDirection:"row",
        flexWrap:"wrap",
        fontSize:14,
        maxWidth:'100%',
      }
})

export default Profile;