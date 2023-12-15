import { useEffect, useRef } from "react";
import { Animated, View,StyleSheet, Easing } from "react-native";


export default function AnimatedClock(props){
    const translation = useRef(new Animated.Value(0)).current;
    const animationRef = useRef(null);

  useEffect(() => {
     animationRef.current = Animated.loop(
      Animated.timing(translation, {
        toValue: 1, // You can change this value to control the rotation angle
        duration: 1000, // Animation duration in milliseconds
        easing:Easing.linear,
        useNativeDriver: true,
      })
    )
    // console.log(props.start)
    props.start ? animationRef.current.start():animationRef.current.reset();
    },[props.start]);

  const rotate = translation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotate from 0 to 360 degrees
  });
    return (
        <Animated.View style={[styles.circle , {transform:[{rotate}]}]}>
            <View style={styles.circleTick}></View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    circle: {
      width: 152,
      height: 152,
      borderRadius: 152 / 2,
      backgroundColor: 'transparent',
      borderWidth: 9,
      borderColor: 'orange',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    circleTick: {
      width: 9,
      height: 152 / 2,
      backgroundColor: 'orange',
      position: 'absolute',
      bottom: 0,
    },
  });
  