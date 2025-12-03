/*menu con 
-Añadoir imagen
gakeria
camata 
cancelar

cuando se tenga la imagen*/

import { Ionicons } from '@expo/vector-icons';
import * as ExpoImagePicker from 'expo-image-picker';
import { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ImagePreview } from './ImagePreview';
import { Camera } from 'expo-camera';
import {CameraComponent} from './CameraComponent';

type Props ={
    onPhotoSelected: (uri: string)=> void;
}



export function ImagePicker(

    {onPhotoSelected} : Props
) {

    const [modalOpen, setModalOpen] = useState(false);

    //estado para la imagen seleccionada o tomada
    const [Image, setImage] = useState<string | null>(null)

    //estado para la camara
    const [cameraOpen, setcameraOpen] = useState(false)

    //abrir galeria de imagenes
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onNewPhoto = () => {
        setImage(null);
        setcameraOpen(true);
    }
    const onSavePhoto= (uri:string) =>{
        //enviar todo al componente padre
        onPhotoSelected(uri)

        Alert.alert('Foto guardada');
        setModalOpen(false);
        setImage(null);
    }

    const onPictureTacked = (uri: string) =>{
        setImage(uri);
        setcameraOpen(false);
    }

    //menu de opciones
    const renderMenu = (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.tittle}>Menu de IMAGEN</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity
                    onPress={() => setcameraOpen(true)}
                    >
                        <Text style={styles.button}>Camara</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                    onPress={pickImage}>
                        <Text style={styles.button}>galeria</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => setModalOpen(false)}
                    >
                        <Text style={styles.cancelbutton}>cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );

    return (
        <>
            <TouchableOpacity
                onPress={() => setModalOpen(true)}
            >
                <Ionicons
                    name="camera-outline"
                    size={32}
                    color="green"
                />
            </TouchableOpacity>
            <Modal
                visible={modalOpen}
                transparent
                animationType='slide'
            >

                {/*si no hay imagen seleccionada ni camara abierta: mostrar menú*/}
                {!Image && !cameraOpen ? renderMenu : null}

                {cameraOpen?(
                    <CameraComponent
                    onCancel={()=> setcameraOpen (false)}
                    onPictureTaked={onPictureTacked}
                    />
                ): null}

                {Image ? (
                    <ImagePreview
                    uri={Image}
                    onCancel={()=> setImage (null)}
                    newPhoto={onNewPhoto}
                    onSave={onSavePhoto}                    
                    />
                ) : null}
            </Modal>
        </>

    );
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba (0,0,0,0.15)',

    },
    modalContent: {
        backgroundColor: '#000',
        width: '70%',
        padding: 20,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
    tittle: {
        fontWeight: 700,
        fontSize: 20,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
    },
    button: {
        fontWeight: 600,
        fontSize: 22,
        color: '#11b4f5ff'
    },
    cancelbutton: {
        fontWeight: 600,
        fontSize: 22,
        color: 'red'

    }
})