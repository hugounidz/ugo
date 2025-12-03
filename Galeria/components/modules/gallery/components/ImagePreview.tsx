import { Ionicons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View,StyleSheet } from "react-native";

type Props={
    uri: string,
    onCancel:() => void;
    onSave: (uri: string) => void;
    newPhoto: () => void;
}

export function ImagePreview(
    {
        uri,
        onCancel,
        onSave,
        newPhoto,
    } : Props
){

    return(
        <View
        style={styles.container}
        >
            <Image
            source={{uri}}
            style={styles.photo}
            />

            

            <View
            style={styles.buttons}>
                {/**botones: cancelar, guardar, tomar foto */}
                <TouchableOpacity
                onPress={onCancel}>

                    <Ionicons
                    name="close"
                    size={32}
                    color="white"
                    ></Ionicons>
                </TouchableOpacity>

                 <TouchableOpacity>
                    <Ionicons
                    name="save-outline"
                    size={32}
                    color="white"
                    ></Ionicons>
                </TouchableOpacity>

                 <TouchableOpacity
                 onPress={()=> onSave (uri)}
                 >
                    <Ionicons
                    name="camera-outline"
                    size={32}
                    color="white"
                    ></Ionicons>
                </TouchableOpacity>

            </View>

        </View>
    );
}
const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent:'center',
        backgroundColor: '#000',
    },
    photo:{
        height: '100%',
        objectFit:'contain'
        
    },
    buttons:{
        position: 'absolute',
        bottom: 48,
        left: 0,
        right: 0,
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'space-around',
        flexDirection:'row'
    },


})