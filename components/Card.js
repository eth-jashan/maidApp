import React from 'react';
import {View,Text,StyleSheet, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';

import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';

const Card = ({term,onTermChange,onTermSubmit}) => {
    return(
        <View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',padding:10,width:"70%"}}>
                <View style={{width:"80%",height:"30%"}}>
                <DropDownPicker
                        items={[
                            {label: 'English', value: 'en', icon: () => <Icon name="flag" size={18} color="#900" />},
                            {label: 'Spanish', value: 'es', icon: () => <Icon name="flag" size={18} color="#900" />},
                            {label: 'Italian', value: 'it', icon: () => <Icon name="flag" size={18} color="#900" />}
                        ]}/>  
                </View>
                  
                <TextInput
                mode='flat'
                autoCorrect={false}
                style={styles.input}
                value={term}
                onChangeText={onTermChange}
                onEndEditing={onTermSubmit}
                theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                label='Expected Price'
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        width:Dimensions.get('window').width*0.2,
        margin:1,
        height:50,
        backgroundColor:'#ffffff',
        position:'relative',
        fontSize:15
    }
});

export default Card;