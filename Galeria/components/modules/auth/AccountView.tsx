import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Avatar from './Avatar'

export default function AccountView({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  //

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, website, avatar_url')
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>

      <View>
    {/* Add to the body */}
    <View>
      <Avatar
        size={200}
        url={avatarUrl}
        onUpload={(url: string) => {
          setAvatarUrl(url)
          updateProfile({ username, website, avatar_url: url })
        }}
      />
    </View>
    {/* ... */}
  </View>
      
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={styles.label}>Email</Text>
        <TextInput value={session?.user?.email} editable={false} style={styles.input} />
      </View>

      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          value={username || ''}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Website</Text>
        <TextInput
          value={website || ''}
          onChangeText={(text) => setWebsite(text)}
          style={styles.input}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity
          onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
          disabled={loading}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{loading ? 'Loading ...' : 'Update'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.verticallySpaced}>
        <TouchableOpacity onPress={() => supabase.auth.signOut()} style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0d0d0d", // fondo negro elegante
    justifyContent: "center",
  },

  verticallySpaced: {
    marginVertical: 10,
    alignSelf: "stretch",
    color: "white"
  },

  mt20: {
    marginTop: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#2a2a2a",
    backgroundColor: "#1a1a1a",
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    fontSize: 16,

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  button: {
    backgroundColor: "#4A6CF7", // azul que resalta en modo oscuro
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#4A6CF7",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
    letterSpacing: 0.5,
    fontSize: 16,
  },
  label: {
  color: "white",
}
});
