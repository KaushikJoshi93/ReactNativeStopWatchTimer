import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Timer(props) {
  const [timerValue, setTimerValue] = useState({ minute: 0, second: 0, millisecond: 0 });
  const isStarted = useRef(props.state.startTimer);
  // console.log(props.state.startTimer , "outsidie")

  useEffect(() => {
    // console.log("isStarted",isStarted)
    isStarted.current = props.state.startTimer
    if(props.state.lapTimer){
      console.log("timings lapped...." , props)
      props.dispatch({type:"UPDATE",payload:timerValue})
    }
    let interval;
    if(isStarted.current){
      let startTime = new Date();
      let newDate = new Date();
      newDate.setMinutes(props.state.minute ||0);
      newDate.setSeconds(props.state.second ||0);
      newDate.setMilliseconds(props.state.millisecond ||0);
       interval = setInterval(() => {
        console.log("inside interval" , props.state)
        
        newDate = new Date();
        let elapsedTime = newDate -  startTime;
        const minutes = Math.floor(elapsedTime / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        const milliseconds = elapsedTime % 1000;
        setTimerValue( {
          minute: minutes,
          second: seconds,
          millisecond: milliseconds,
        })
        // props.dispatch({type:"SET" , payload:{minute:timerValue.minute , second:timerValue.second , millisecond:timerValue.millisecond}});
      }, 1); // Update every second (1000 milliseconds)
    }

    // Clear the interval when the component unmounts
    return () => {
      if(isStarted){
        clearInterval(interval);
      }
    };
  }, [isStarted,props.state["startTimer"] , props.state.lapTimer]);

  return (
    <View style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Text style={styles.timerText}>{`${String(timerValue.minute).padStart(
        2,
        "0"
      )}:${String(timerValue.second).padStart(2, "0")}:${String(
        timerValue.millisecond
      ).padStart(2, "0")}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timerText: {
    fontSize: 52,
    color: "gray",
    fontWeight: "800",
  },
});
