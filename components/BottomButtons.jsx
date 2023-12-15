import { View,StyleSheet} from "react-native";
import {Button} from 'react-native-paper'


export default function BottomButtons(props){

    return (
        <View style={styles.container}>
            <Button title="CLEAR" style={styles.buttonStyle} mode="text" textColor="orange" onPress={()=>props.dispatch({type:"CLEAR"})}>CLEAR</Button>
            <Button title="LAP" style={styles.buttonStyle} mode="text" textColor="orange" onPress={()=>props.dispatch({type:"LAP"})}>LAP</Button>
            <Button title="STOP" style={styles.buttonStyle} mode="text" textColor="orange" onPress={()=>props.dispatch({type:"STOP"})}>STOP</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:40,
        backgroundColor:"lightblue",
        display:"flex",
        flexDirection:"row"
    },
    buttonStyle:{
       flex:1,
       backgroundColor:"white",
       borderRadius:2,
       borderRightWidth:1,
       borderColor:"gray",
       color:"orange"
    }
})