import { supabase } from '@/lib/supabase'
import React, { useState } from 'react'
import { Alert, AppState, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export function LoginView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { data: { session }, error } = await supabase.auth.signUp({ email, password })
    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido!!!!</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} disabled={loading} onPress={signInWithEmail}>
        <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.buttonSecondary]} disabled={loading} onPress={signUpWithEmail}>
        <Text style={[styles.buttonText, styles.buttonTextSecondary]}>{loading ? 'Signing up...' : 'Sign Up'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#0d0d0d', // 🔥 fondo negro
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#fff', // blanco
  },

  label: {
    color: "#ccc", // gris claro elegante
    marginBottom: 6,
    fontSize: 15,
    fontWeight: "600",
  },

  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff', // texto blanco
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },

  button: {
    backgroundColor: '#4A6CF7',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonSecondary: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#4A6CF7',
  },

  buttonTextSecondary: {
    color: '#4A6CF7',
  },
})
