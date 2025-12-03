import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState, } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//este archivo permite al usuario abrir la camara con la libreria  expo-camera

type Props = {
    onCancel:()=> void;
    onPictureTaked:(uri: string) => void
}


export function CameraComponent({
    onCancel, //por si el usuario cancela tomar la foto
    onPictureTaked, //cuando el usuario tome la foto la manda como uri
    
}: Props) {
  const [facing, setFacing] = useState<CameraType>('back'); //camara trasera y delantera
  const [permission, requestPermission] = useCameraPermissions();

  //referencia al componente de camara
  const cameraRef = useRef<CameraView>(null)

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>necesito que ole permitas a la app ingresar a tu camara</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() { //para cambiar camara frontal y asi
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async() => {
    //acceder al componente de camara y tomar foto
    const photo = await cameraRef.current?.takePictureAsync();
    //si se tomo foto retornar la ruta del archivo
    if (photo)
        onPictureTaked(photo.uri);
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      <View style={styles.buttons}>
                {/**botones: cancelar, guardar, tomar foto */}
                <TouchableOpacity
                onPress={onCancel}
                >
                    <Ionicons
                    name="close"
                    size={32}
                    color="white"
                    ></Ionicons>
                </TouchableOpacity>

                 <TouchableOpacity
                 onPress={takePicture}
                 >
                    <Ionicons
                    name="camera"
                    size={32}
                    color="white"
                    ></Ionicons>
                </TouchableOpacity>

                 <TouchableOpacity
                 onPress={toggleCameraFacing}
                 >
                    <Ionicons
                    name="camera-reverse-outline"
                    size={32}
                    color="white"
                    ></Ionicons>
                </TouchableOpacity>

            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
    buttons:{
        position:'absolute',
        bottom: 48,
        left:0,
        right:0,
        flexDirection:'row',
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'space-around'
    },
});
function userRef<T>(arg0: null) {
    throw new Error('Function not implemented.');
}