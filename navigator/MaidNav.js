import React from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import FilterScreen from '../source/screens/FilterScreen';
import HomeScreen from '../source/screens/HomeScreen';
import ProfileScreen from '../source/screens/ProfileScreen';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 
import AuthScreen from '../source/screens/AuthScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';


const defaultNavOptions = {
    headerStyle:{
        backgroundColor:'#3c4a3b'
    },
    headerTintColor:'#63ff7b'
}

const AuthNavigator = createStackNavigator({
    Auth:AuthScreen
},{defaultNavigationOptions:defaultNavOptions})

const HomeNavigator = createStackNavigator({
    Home:HomeScreen
},{defaultNavigationOptions:defaultNavOptions});

const FilterNavigator = createStackNavigator({
    Filter:FilterScreen
},{defaultNavigationOptions:defaultNavOptions})

const ProfileNavigator = createStackNavigator({
    Profile:ProfileScreen
},{defaultNavigationOptions:defaultNavOptions})

const tabScreenConfig={
    Home:{
        screen:HomeNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return(<MaterialCommunityIcons name="broom" size={24} color={tabInfo.tintColor} />)
            }
        }   
    },
    Filter:{
        screen:FilterNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return(<Foundation name="filter" size={24} color={tabInfo.tintColor} />)
            }
        }
    },
    Profile:{
        screen:ProfileNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return(<MaterialCommunityIcons name="face-profile" size={24} color={tabInfo.tintColor} />)
            }
        }
    }
}

// const sideDrawer = createDrawerNavigator({
//     Filters:{screen:FilterNavigator,
//     navigationOptions:{
//         drawerLabel:'Filter'
//     }}
// })


const BottomTabNav = createMaterialBottomTabNavigator(tabScreenConfig,{
    activeColor:'#6ff76a',
    shifting:true,
    barStyle:{backgroundColor:'#3c4a3b'}
})

const AppSwitch = createSwitchNavigator({
    Auth:AuthNavigator,
    Main:BottomTabNav
})

export default createAppContainer(AppSwitch);