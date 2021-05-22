import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import {View,StyleSheet,Text,Button, Dimensions,Switch,TouchableOpacity,Image,ImageBackground,Alert,ActivityIndicator} from 'react-native';

import {TextInput} from 'react-native-paper';
import { useDispatch } from 'react-redux';

//actions
import * as authActions from '../../store/action/Auth';
import * as manageActions from '../../store/action/ManageUser';

const AuthScreen = props => {

    const dispatch = useDispatch();


    const[password,setPassword] = useState();
    const[email,setEmail] = useState();
    const[name,setName] = useState();


    const[isSignUp,setIsSignUp] =useState(false);
    const[error,setError] = useState();
    const[load,setLoad] = useState(false);

    useEffect(()=>{
        if(error){
            Alert.alert('An Error Occured',error,[{text:'Okay'}])
        }
    },[error])

    const authHandler = async(email,password) => {
        setLoad(true)
        let action;
        if(isSignUp){
            action=authActions.signup(email,password); 
        }
        else{
            action=authActions.login(email,password);
        }
        setError(null);
        try{
             if(isSignUp){
                await dispatch(action);
                await dispatch(manageActions.createUser(name));
                props.navigation.navigate('Welcome')
            }
            else{
                await dispatch(action);
                props.navigation.navigate('Main')
            }
            
            
            
            
        }catch(err){
            setError(err.message);
            
        }setLoad(false)
    }

    const validate = (email,password) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;console.log(email);console.log(name);
        if(reg.test(email)===false){
            Alert.alert('Wrong Input','Please enter a valid email',[{text:'Okay'}])
            
        }
        else{
            authHandler(email,password)
        }
    }


    return(
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <ImageBackground style={{flex:1,justifyContent:'center',alignItems:'center',width:'100%'}} source={require('../../assets/robert.jpg')}>
            <View style={{alignItems:'center',elevation:5,borderRadius:15,justifyContent:'center',width:'95%',padding:5,backgroundColor:'white'}}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>House Keeper</Text>  
            </View>
            <View>
            {isSignUp?<TextInput
                mode='flat'
                autoCompleteType='name'
                style={styles.input}
                value={name}
                onChangeText={text=>setName(text)}
                theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                label='Enter Name'
            />:null}
            <TextInput
                mode='flat'
                autoCompleteType='email'
                style={styles.input}
                value={email}
                onChangeText={text=>setEmail(text)}
                theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                label='Enter Email'
            />
            <TextInput
                mode='flat'
                style={styles.input}
                value={password}
                onChangeText={text=>setPassword(text)}
                theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                label='Enter Password'
                secureTextEntry
            />
            </View>
            <TouchableOpacity  style={styles.button}  onPress={validate.bind(this,email,password)}>
                {load?<ActivityIndicator color='#ffffff' size='small'/>:
                    <Text style={{fontWeight:'bold',fontSize:17,color:'#ffffff',textAlign:'center'}} >{isSignUp?'Sign Up' : 'Login'}</Text>}
                    
            </TouchableOpacity>
            <View style={{alignItems:'center',marginVertical:5,justifyContent:'center',width:'100%',marginVertical:30,transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]}}>
                    <Switch
                     trackColor={{ false: "#664f2f", true: '#eeb76b' }}
                     thumbColor={isSignUp ? "#e2703a" : "#30180c"}
                     onValueChange={()=>setIsSignUp(prevState=>!prevState)} 
                     value={isSignUp}
                     />
            </View>
            </View>
            </ImageBackground>
        </View>
    );
};

AuthScreen.navigationOptions = () => {
    return{
        header:()=>{
            return false
        }
    }
}

const styles = StyleSheet.create({
    title:{
        fontWeight:'bold',
        fontSize:30,
    },
    titleContainer:{
        alignItems:'center',
        padding:25
    },
    input:{
        width:Dimensions.get('window').width*0.85,
        margin:15,
        fontFamily:'bold',
        height:55,
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

    }
});

export default AuthScreen;