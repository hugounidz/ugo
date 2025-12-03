import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { StyleSheet, View, Alert, Image, Button } from 'react-native'
import * as ImagePicker from 'expo-image-picker';

interface Props {
  size: number
  url: string | null
  onUpload: (filePath: string) => void
}

export default function Avatar({ url, size = 150, onUpload }: Props) {
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const avatarSize = { height: size, width: size }

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) throw error

      const fr = new FileReader()
      fr.readAsDataURL(data)
      fr.onload = () => setAvatarUrl(fr.result as string)
    } catch (error) {
      if (error instanceof Error) console.log('Error downloading image: ', error.message)
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true)
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      })

      if (result.canceled) return

      const image = result.assets[0]
      const arrayBuffer = await fetch(image.uri).then((res) => res.arrayBuffer())

      const fileExt = image.uri.split('.').pop()?.toLowerCase() ?? 'jpg'
const filePath = `${Date.now()}.${fileExt}`

      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, arrayBuffer, {
          contentType: image.mimeType ?? 'image/jpeg',
        })

      if (error) throw error

      onUpload(data.path)
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <View style={{ alignItems: 'center' }}>
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} style={[avatarSize, styles.avatar]} />
      ) : (
        <View style={[avatarSize, styles.noImage]} />
      )}

      <Button
        title={uploading ? 'Uploading...' : 'Cambiar foto'}
        onPress={uploadAvatar}
        disabled={uploading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 10,
    objectFit: 'cover',
  },
  noImage: {
    backgroundColor: '#666',
    borderRadius: 10,
  },
})