import React from 'react';
import {View,StyleSheet,TextInput, Dimensions} from 'react-native';

//icon
import { Feather } from '@expo/vector-icons';

const SearchBar = ({term,onTermChange,onTermSubmit}) => {
    return (
        <View style={styles.backgroundStyle}>
            <Feather name="search" style={styles.iconStyle}/>
            <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.inputStyle}
            placeholder="Search By City"
            value={term}
            onChangeText={onTermChange}
            onEndEditing={onTermSubmit}
            />

        </View>
    );
}

const styles=StyleSheet.create({
    backgroundStyle:{
        backgroundColor:'#e6e6e6',
        height:Dimensions.get('window').height*0.06,
        flexDirection:'row',
        borderRadius:20,
        borderWidth:0.15,
        borderColor:'#e2703a'
    },
    inputStyle:{
        flex:1,
        fontSize:18
    },
    iconStyle:{
        fontSize:25,
        alignSelf:'center',
        marginHorizontal:15,
        color:'#e2703a'
    }

});

export default SearchBar;