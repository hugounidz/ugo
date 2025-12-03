
import { Session } from '@supabase/supabase-js'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AccountView from '../auth/AccountView'
import { GalleryView } from '../gallery/GalleryView'
import { NotasView } from '../notes/NotasView'

type Props = {
  session: Session
}
export default function HomeView({ session }: Props) {
  const [screen, setScreen] = useState<'home'| 'gallery' | 'profile' | 'notes'>('home')

  const renderContent = () => {
    switch (screen) {
      case 'gallery':
        return <GalleryView/>
      case 'profile':
        return <AccountView session={session}/>
      case 'notes':
        return <NotasView/>
      default:
        return (
          <View style={styles.homeButtons}>

            <TouchableOpacity style={styles.button} onPress={() => setScreen('gallery')}>
              <Text style={styles.buttonText}>Galería</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setScreen('profile')}>
              <Text style={styles.buttonText}>Perfil</Text>
            </TouchableOpacity>

             <TouchableOpacity style={styles.button} onPress={() => setScreen('notes')}>
              <Text style={styles.buttonText}>Notas</Text>
            </TouchableOpacity>
          </View>
        )
    }
  }

  return (
    <View style={styles.container}>
      {renderContent()}


      {screen !== 'home' && (
        <TouchableOpacity style={styles.cancelButton} onPress={() => setScreen('home')}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  homeButtons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0738faff', 
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 20,
    shadowColor: '#0838f9ff',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  cancelButton: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: [{ translateX: -75 }],
    width: 150,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    borderRadius: 16,

    shadowColor: '#ff4d4d',
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },

  cancelText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 6,
    fontWeight: '600',
  },
})
