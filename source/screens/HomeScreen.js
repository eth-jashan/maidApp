import React from 'react';
import {View,StyleSheet,Text,Button} from 'react-native';

const HomeScreen = props => {
    return(
        <View>
            <Text>HomeScreen</Text>
        </View>
    );
};

HomeScreen.navigationOptions = navData => {
    return{
        headerTitle:'Find Maid',
        headerLeft: () => (
            <Button styles={{padding:10}}
              onPress={() => {navData.navigation.toggleDrawer()}}
              title="Menu"
              color="#3c4a3b"
            />
            
          )
    }
}

const styles = StyleSheet.create({});

export default HomeScreen;