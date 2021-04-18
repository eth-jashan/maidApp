import React, { useRef, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Animated, Text, View,Easing } from 'react-native';


const StaggeringView = (props) => {
  const transition = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  useEffect(() => {
    Animated.spring(
      transition,
      { 
        
        delay:props.delay,
        toValue:-Dimensions.get('window').width,
        duration: 1000,
        useNativeDriver:true,
      }
    ).start();
  }, [transition])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        transform: [{translateX:transition}],
        left:Dimensions.get('window').width         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default StaggeringView