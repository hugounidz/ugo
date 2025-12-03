import { FlatList, StyleSheet, View, Image } from "react-native"
import { ImagePicker } from "./components/ImagePicker"
import { useState } from "react"

// pagina principal para ver las imagenes 
export function GalleryView(){
    //estado para la coleccion de imagenes
    const [images,setImage] = useState<string []> ([])

    //estado para agregar nuava imagen a la coleccion
    const addPhoto= (uri:string) => {
        setImage ([uri, ...images]);
    }

    return(
        <View
        style={styles.container}
        >
            <ImagePicker
            onPhotoSelected={addPhoto}
            />

            {/* mostrar las imagenes con un flatlist*/}

            <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} // para mostrar en formato de galería
        contentContainerStyle={styles.gallery}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
      />

        </View>
    );
}

const styles = StyleSheet.create({

    container:{
        paddingTop:60,
        paddingHorizontal:16,

    },
    gallery:{
    marginTop:16,
    },
    image:{
        width:100,
        height:100,
        borderRadius:8,
        margin:4
    }
})