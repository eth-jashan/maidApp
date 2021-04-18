import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { View, Text, Animated, StyleSheet, Dimensions, Image } from 'react-native'
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Transition, Transitioning} from 'react-native-reanimated'

import StaggeringView from '../component/StaggeringView'

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const TITLE_SIZE = 50
const PRICE_SIZE = 40
const DURATION = 700



const transition = (
    <Transition.Together>
        <Transition.Out type='slide-bottom' interpolation='easeIn' durationMs={DURATION} />
        <Transition.Change/>
        <Transition.In type='slide-bottom' interpolation='easeOut' durationMs={DURATION}/>
    </Transition.Together>
)


const {width, height} = Dimensions.get('screen')

const MaidList = (props) => {

    const Item = ({children, style}) => {

        return<View key={index} style={[{justifyContent:'center', overflow:'hidden', backgroundColor:'transparent', padding:8}, style]}>
            {children}
        </View>
    
    }
    
    const PriceInfo = ({index,  color}) => {
        return<Item>
        <Text key={`priceInfo-${index}`} style={{fontSize:PRICE_SIZE, color:color,alignSelf:'center'}}>{data[index].startingprice}</Text>
        </Item>
    }
    
    const TitleInfo = ({index, text, color}) => {
        return(<View style={{overflow:'hidden'}}>
        <Text key={`title-${index}`} style={{fontSize:TITLE_SIZE, color:color,alignSelf:'center'}}>{text}</Text>
        </View>)
    }
    
    const DetailView = ({color, index}) => {
        return(<StaggeringView style={{overflow:'hidden', marginVertical:20, width:width*0.85, padding:16,alignSelf:'center'}}>
        <View style={{flexDirection:'row', justifyContent:'space-between',marginVertical:16}}>

        <View style={{flexDirection:'row'}}>
            <View>
            <FontAwesome5 style={{alignSelf:'center'}} name="road" size={24} color={"#1ec0af"} />
            <Text style={{ color:"#1ec0af", alignSelf:'center'}}>Range</Text>
            </View>
            <Text style={{fontSize:22, color:color,alignSelf:'center', marginHorizontal:10}}>{data[index].singleCharge}</Text>
        </View>

        <View style={{flexDirection:'row'}}>
            <View>
            <FontAwesome5 style={{alignSelf:'center'}} name="horse-head" size={24} color={"#1ec0af"} />
            <Text style={{ color:"#1ec0af", alignSelf:'center'}}>Horse</Text>
            </View>
            <Text style={{fontSize:22, color:color,alignSelf:'center',marginHorizontal:10}}>142.7 PS</Text>
        </View>
        
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between',marginVertical:16}}>

        <View style={{flexDirection:'row'}}>
            <View>
            <FontAwesome style={{alignSelf:'center'}} name="gears" size={24} color={"#1ec0af"} />
            <Text style={{ color:"#1ec0af", alignSelf:'center'}}>Range</Text>
            </View>
            <Text style={{fontSize:22, color:color,alignSelf:'center',marginHorizontal:10}}>353 Nm</Text>
        </View>

        <View style={{flexDirection:'row'}}>
        <View>
            <MaterialCommunityIcons style={{alignSelf:'center'}} name="speedometer" size={24} color={"#1ec0af"} />
            <Text style={{ color:"#1ec0af", alignSelf:'center'}}>Range</Text>
            </View>
            <Text style={{fontSize:22, color:color,alignSelf:'center',marginHorizontal:10}}>2.4 sec</Text>
        </View>

        </View>

        <View style={{flexDirection:'row', alignSelf:'center'}}>
            <View>
            <Feather style={{alignSelf:'center'}} name="battery-charging" size={50} color={"#1ec0af"} />
            <Text style={{ color:"#1ec0af", alignSelf:'center',fontSize:20}}>Charge Time</Text>
            </View>
            <Text style={{fontSize:30, color:color, alignSelf:'center'}}>4 hrs</Text>
        </View>

        </StaggeringView>)
    }

    
    const featureList = ['battery', 'speed', 'horsepower', 'singleCharge']
    const data = [ {name:'Model 3', battery:'600Kwh', speed:'100km/h', horsepower:'400', singleCharge:'400km', startingprice:'₹40lacs onwards',backgroundColor:'black',uri:'https://firebasestorage.googleapis.com/v0/b/bookworm-60f6f.appspot.com/o/Tata-Nexon-Car-PNG-Image.png?alt=media&token=a04a93d3-0184-406a-b098-c5c168b20383'},
    {name:'Cybertruck', battery:'600Kwh', speed:'100km/h', horsepower:'400', singleCharge:'400km', startingprice:'₹80lacs onwards',backgroundColor:'white',uri:'https://firebasestorage.googleapis.com/v0/b/bookworm-60f6f.appspot.com/o/Tata-Nexon-Car-PNG-Image.png?alt=media&token=a04a93d3-0184-406a-b098-c5c168b20383'},
    {name:'Model X', battery:'600Kwh', speed:'100km/h', horsepower:'500', singleCharge:'400km', startingprice:'₹80lacs onwards',backgroundColor:'black', uri:'https://firebasestorage.googleapis.com/v0/b/bookworm-60f6f.appspot.com/o/Tata-Nexon-Car-PNG-Image.png?alt=media&token=a04a93d3-0184-406a-b098-c5c168b20383'},
    {name:'Model S', battery:'600Kwh', speed:'100km/h', horsepower:'300', singleCharge:'400km', startingprice:'₹80lacs onwards',backgroundColor:'white', uri:'https://firebasestorage.googleapis.com/v0/b/bookworm-60f6f.appspot.com/o/Tata-Nexon-Car-PNG-Image.png?alt=media&token=a04a93d3-0184-406a-b098-c5c168b20383'}  ]
    const [index, setIndex] = useState(0)        
    const activeIndex = useRef(new Animated.Value(0)).current
    const animation = useRef(new Animated.Value(0)).current
    const ref = useRef()
    

    useEffect(()=>{
        Animated.timing(animation,{
            toValue:activeIndex,
            duration:DURATION*0.7,
            useNativeDriver:true
        }).start();
    },[])

    const setActiveIndex = useCallback(newIndex=>{
        activeIndex.setValue(newIndex)
        ref.current.animateNextTransition()
        setIndex(newIndex)        
        console.log('Index:', newIndex)
    })

    const transformY = animation.interpolate({
        inputRange:[-1,0,1],
        outputRange:[height, 0, -height]
    })

    return(
        <FlingGestureHandler 
            key='up'
            direction={Directions.UP}
            onHandlerStateChange={(ev)=>{
                if(index === data.length -1){
                    return
                }
                if(ev.nativeEvent.state === State.END){
                    setActiveIndex(index+1)
                }
            }}
        >
        <FlingGestureHandler
            key='down'
            direction={Directions.DOWN}
            onHandlerStateChange={(ev)=>{
                if(index === 0){
                    return
                }
                if(ev.nativeEvent.state === State.END){
                    setActiveIndex(index-1)
                }
            }}
        >
        <SafeAreaView>

        <Animated.View style={[StyleSheet.absoluteFillObject, {height:height*data.length, transform:[{translateY:transformY}]}]}>
            {data.map((item,i)=>{
                return<View key={i} style={{height:height, backgroundColor:i%2 === 0?'black':'white', width:width}}>
                </View>
            })}
        </Animated.View>
        <Transitioning.View ref={ref} transition={transition} style={{width:width}}>    
            
            <TitleInfo
                index = {index}
                color={index%2===0?'white':'black'}
                text={data[index].name}
            />
            <DetailView
                index={index}
                color={index%2===0?'white':'black'}
            />

        
            
            <StaggeringView delay={1000} key={index} style={{width:315, height:150, alignSelf:'center'}}>
                <Image
                    style={{width:'100%', height:'100%'}}
                    source={{uri:data[index].uri}}
                />
            </StaggeringView>
    
        
        
            <PriceInfo
                index={index}
                color={index%2===0?'white':'black'}
            />
        </Transitioning.View>
        
        </SafeAreaView>
        </FlingGestureHandler>
        </FlingGestureHandler>
    )

}

export default MaidList