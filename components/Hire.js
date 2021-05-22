import React from 'react';
import { useState } from 'react';
import {View,StyleSheet,Button,Text, Dimensions, SafeAreaView,FlatList,TouchableOpacity,Alert,ActivityIndicator} from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import TimePicker from 'react-native-modal-datetime-picker';
import { Chip } from 'react-native-paper';

//api
import GoogleLocationApi from '../api/GoogleLocationApi';

//icons
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { useCallback } from 'react';

//actions
import * as workAction from '../store/action/ManageWork';
import { useDispatch } from 'react-redux';


const Hire = (props) => {
    const[name,setName] = useState('');
    const[phone,setPhone] = useState('');
    const[time,setTime] = useState('');
    const[toTime,setToTime] = useState('');
    const[address,setAdress] = useState('');
    const[basePrice,setBasePrice] = useState('');
    const[chipWork,setChipWork] = useState([]); 
    const[loc,setLoc] = useState('');
    const[maidId,setMaidId] = useState('');

    const[clockVisible,setClockVisible] = useState(false);
    const[Visible,setVisible] = useState(false);

    const[Styles,setStyle] = useState(['#cccccc','#cccccc','#cccccc']);
    const[chipId,setChipId] = useState([]);
    const[chipBool,setChipBool] = useState([false,false,false]);
    const[done,setDone] = useState(0);

    const[isLocated,setIsLocated] = useState(false);

    const[load,setLoad] =  useState(false);
    const[loader,setLoader] = useState(false);
    const[gloading,setGloading] = useState(false);

    const dispatch = useDispatch();

    

    //  const {workArray} = props;
    //console.log(props.maidData.id)

    const reset = () => {
        setName('');setAdress('');setPhone('');setTime('');setToTime('');setBasePrice('');setIsLocated(false);
        setStyle(['#cccccc','#cccccc','#cccccc']);setChipId([]);setChipWork([]);
        setChipBool([false,false,false]);setDone(0);setLoader(false);setLoc('');setGloading(false);
        setClockVisible(false);setVisible(false);setClockVisible(false);setMaidId('');
    }

    const validate = () => {
        setLoader(true);
        if(loc.trim()==0){
            Alert.alert('Sync Location','Please Obtain your Location',[{text:'Okay'}])
        }
        else if(name.trim().length>0 && phone.trim().length>0 && time.trim().length > 0 &&
        toTime.trim().length > 0 && address.trim().length>0 &&chipWork.length!=0){
            
            setMaidId(props.maidData.id)
            dispatch(workAction.hireMaid(maidId,name,phone,time,toTime,address,basePrice,chipWork,loc,"nego"))
            
            console.log('dispatched')
            //console.log(maidId,name,phone,time,toTime,address,basePrice,chipWork,loc,"nego");
            
        }
        else{
            Alert.alert('Invalid Form Data','Please Enter all The required Data',[{text:'Okay'}])
        }
        setLoader(false);
    }

    
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
        setDone(done+1);
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

    const revereGeoCodeResponse = async(latitude,longitude) =>{
        try{
            const response = await GoogleLocationApi.get(`geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDsDKH-37DS6ZnGY_oIi7t5YE0oAAZ-V88`)
           // console.log(response.data);
            const address =  response.data.results[0].formatted_address;
            //setLoc(JSON.stringify( response.data.results[0].geometry.location))
            const loc = JSON.stringify(response.data.results[0].address_components) ;
           
 
            console.log('*************************',address);
            setAdress(address);
            setLoc(loc);
            console.log('*******city******************',loc);
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

    return(
        <SafeAreaView >
        <ScrollView keyboardShouldPersistTaps={true}>
            <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{alignSelf:'center',color:'#e2703a',fontSize:25,fontWeight:'bold',padding:1,textDecorationLine:'underline'}} >Hiring Form</Text>
            <Text style={{color:'#e2703a',alignSelf:'center'}}>You're Hiring {props.maidData.name}</Text>
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
                keyboardType='phone-pad'
                style={styles.input}
                value={phone}
                onChangeText={text=>setPhone(text)}
                theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                label='Enter Phone No.'
                />
                <TextInput
                keyboardType='phone-pad'
                mode='outlined'
                style={styles.input}
                value={basePrice}
                onChangeText={text=>setBasePrice(text)}
                theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                label='Enter Hiring Salary'
                />
                <Text>Select From Available Services:</Text>
                <View style={{flexDirection:'row'}}>
                {props.maidData.work.map((kaam,index)=>       
                    <View style={{margin:1}}>
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
                label='From'
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
                label='Till'
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
                <TouchableOpacity  style={styles.buttonDisagree}  onPress={reset}>
                            <Text style={{fontWeight:'bold',fontSize:17,color:'#ffffff',textAlign:'center'}} >Reset</Text>
               </TouchableOpacity>
               <TouchableOpacity  style={styles.buttonAgree}  onPress={validate}>
            {loader?<ActivityIndicator color='#ffffff' size='small'/>:<Text style={{fontWeight:'bold',fontSize:17,color:'#ffffff',textAlign:'center'}} >Submit</Text>}
            </TouchableOpacity>
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
        margin:Dimensions.get('window').height*0.011,
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
    buttonDisagree:{
        borderRadius:20,
        backgroundColor:'black',
        width:Dimensions.get('window').width*0.40,
        marginHorizontal:5,
        marginBottom:3,
        padding:10,
        alignSelf:'center',
        position:'relative'
    },
    buttonAgree:{
        borderRadius:20,
        backgroundColor:'green',
        width:Dimensions.get('window').width*0.40,
        marginHorizontal:5,
        marginBottom:3,
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

export default Hire;