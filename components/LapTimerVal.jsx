import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const LapTimerVal = (props)=>{



    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <Text style={styles.circleText}>{props.index + 1}</Text>
            </View>
            <View>
                <Text style={styles.timerText}>{`${props.item.minute}`.padStart(2 , 0)}:{`${props.item.second}`.padStart(2 , 0)}:{props.item.millisecond}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:22
    },
    circle: {
        width: 42,
        height: 42,
        borderRadius: 42 / 2,
        backgroundColor: 'transparent',
        borderWidth: 4,
        borderColor: 'orange',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleText:{
        color:"orange",
        fontSize:22,
        fontWeight:900
    },
    timerText:{
        fontSize:25,
        color:"black"
    }
}) 

export default LapTimerVal;