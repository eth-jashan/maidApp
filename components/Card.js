import React from 'react';
import {View,Text,StyleSheet, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';
const Card = ({term,onTermChange,onTermSubmit}) => {
    return(
        <View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10}}>
                <Text>Car cleaning</Text>
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
        width:Dimensions.get('window').width*0.5,
        margin:15,
        height:50,
        backgroundColor:'#ffffff',
        alignSelf:'center',
        position:'relative',
        borderRadius:10,
        fontSize:15
    }
});

export default Card;