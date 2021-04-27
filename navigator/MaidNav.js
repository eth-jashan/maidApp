import React from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import MaidSecScreen from '../source/screens/MaidSecScreen';
import HomeScreen from '../source/screens/HomeScreen';
import ProfileScreen from '../source/screens/ProfileScreen';
import MaidProfileScreen from '../source/screens/MaidProfileScreen';
import WelcomeScreen from '../WelcomeScreen';


import AuthScreen from '../source/screens/AuthScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';

//icons
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const defaultNavOptions = {
    headerStyle:{
        backgroundColor:'#e2703a'
    },
    headerTintColor:'#ffffff'
}

const AuthNavigator = createStackNavigator({
    Auth:AuthScreen
},{defaultNavigationOptions:defaultNavOptions})

const HomeNavigator = createStackNavigator({
    Home:HomeScreen
},{defaultNavigationOptions:defaultNavOptions});

const MaidSecNavigator = createStackNavigator({
    MaidSec:MaidSecScreen
},{defaultNavigationOptions:defaultNavOptions})

const MaidProfileNavigator = createStackNavigator({
    MaidProfile:MaidProfileScreen
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
    Profile:{
        screen:ProfileNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return(<MaterialCommunityIcons name="face-profile" size={24} color={tabInfo.tintColor} />)
            }
        }
    }
}

const maidTabScreenConfig={
    Work:{
        screen:MaidSecNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                
                return(<MaterialCommunityIcons name="details" size={24} color={tabInfo.tintColor} />)
            }
        }   
    },
    Profile:{
        screen:MaidProfileNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return(<MaterialCommunityIcons name="face-profile" size={24} color={tabInfo.tintColor} />)
            }
        }
    }
}

const BottomTabNav = createMaterialBottomTabNavigator(tabScreenConfig,{
    activeColor:'#e2703a',
    shifting:true,
    barStyle:{backgroundColor:'black'}
})

const MaidBottomTabNav = createMaterialBottomTabNavigator(maidTabScreenConfig,{
    activeColor:'#e2703a',
    shifting:true,
    barStyle:{backgroundColor:'black'}
 })

 const SideDrawer = createDrawerNavigator({
    FindMaid:{screen:BottomTabNav,
        navigationOptions:{
            drawerLabel:'Book Maid'
        }},
     MaidSec:{screen:MaidBottomTabNav,
     navigationOptions:{
         drawerLabel:'Maid Section'
     }}

 })





const AppSwitch = createSwitchNavigator({
    Auth:AuthNavigator,
    Welcome:WelcomeScreen,
    Main:SideDrawer
})

export default createAppContainer(AppSwitch);