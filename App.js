import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AnimatedClock from './components/AnimatedClock';
import { useState } from 'react';
import Timer from './components/Timer';
import BottomButtons from './components/BottomButtons';
import {useReducer} from 'react'
import LapTimerVal from './components/LapTimerVal';

export default function App() {
  const [startAnimation, setStartAnimation] = useState(false);
  const [lapTimingLists , setLapTimingLists] = useState([]);
  const initState = {startTimer:false,minute: 0, second: 0, millisecond: 0,lapTimer:false}
  
  const clearLapTimings = (state)=>{
    console.log(state)
    console.log("Clearing lap timing..."+state.second , " ",state.millisecond)
  }
  const lapTime = (state)=>{
    console.log("lapping time..."+state.second)
    setLapTimingLists((prev)=>[...prev ,{minute:state.minute , second:state.second , millisecond:state.millisecond}])
    
  }
  
  const reducer = (state , action)=>{
    switch(action.type){
      case "UPDATE":
        lapTime(action.payload);
        return {...state , lapTimer:false};
      case "START":
        return {...state , startTimer:true};
      case "STOP":
        return {...state , startTimer:false};
      case "LAP":
        return {
          ...state,
          lapTimer:true
        };
      case "SAVED":
        return {
          ...state,
          lapTimer:false
        }
      case "CLEAR":
        clearLapTimings(state);
        return state;

      case "SET":
        const payload = action.payload
        return {...state , ...payload}
      default:
        return state;
    }
  }
  const [state , dispatch] = useReducer(reducer , initState);
  const handleStartTimer = ()=>{
    setStartAnimation(!startAnimation) ;  
    dispatch({type:"START"})
  }
  
  return (
      <SafeAreaView style={styles.container}>
        <View style={{display:"flex" , flexDirection:"column",alignItems:"center"}}>
          <AnimatedClock start={state.startTimer} />
          <Timer dispatch={dispatch} state={state}/>
          <Button title='Start Timer' onPress={handleStartTimer} disabled={state.startTimer}/>
        </View>
        <ScrollView style={{width:"100%"}}>
          {
            lapTimingLists.length ? lapTimingLists.map((val , index)=>(
              <LapTimerVal key={index} item={val} index={index}/>
            )) : null
          }
        </ScrollView>
        <View style={{width:"100%"}}>
          <BottomButtons dispatch={dispatch}/>
        </View>
      <StatusBar style="auto" />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf6f0',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop:52
  },
  circle: {
    width: 252,
    height: 252,
    borderRadius: 252 / 2,
    backgroundColor: 'transparent',
    borderWidth: 9,
    borderColor: 'orange',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleTick: {
    width: 9,
    height: 252 / 2,
    backgroundColor: 'orange',
    position: 'absolute',
    bottom: 0,
  },
});
