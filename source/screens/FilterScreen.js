import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {View,StyleSheet,Text,Button, Dimensions,Switch,TouchableOpacity,Image,ImageBackground,Alert,ActivityIndicator} from 'react-native';
import {TextInput, Modal, Portal, Provider} from 'react-native-paper';


const FilterScreen = props => {

    const [visible, setVisible] = useState(false);
    const[name,setname] = useState();
    const[phone,setphone] = useState();

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return(
        <View style={{justifyContent:'center', padding:8}}>
            <TextInput
                mode='flat'
                autoCompleteType='name'
                style={styles.input}
                value={name}
                theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                label='Name'
            />
            <TextInput
                mode='flat'
                style={styles.input}
                autoCompleteType='tel'
                value={phone}
                theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                label='Phone Number'
            />
            <TextInput
                value = "Read Only"
                editable = {false}
            />
            <Provider>
                <Portal.Host>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                        <Text>Example Modal.  Click outside this area to dismiss.</Text>
                    </Modal>
                </Portal.Host>
            </Provider>
            
            
            <TouchableOpacity  style={styles.button}  onPress={showModal}>
                <Text>Choose Work</Text>         
            </TouchableOpacity>
        </View>
    );
};

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
    },

    containerStyle:{
        alignSelf:'center',
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width*0.90,
        backgroundColor: 'white',
        padding: 20
    }
});

export default FilterScreen;