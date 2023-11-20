import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import PastReserevationScreen from './PastReserevationScreen';

const ProfileScreen = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.displayName);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const onLogout = () => {
    const auth = getAuth();

    setLoading(true);

    signOut(auth)
      .then(() => {
        setLoading(false);

        setTimeout(() => {
          Alert.alert('Logout Successful', 'You have been logged out.', [
            { text: 'OK', onPress: () => console.log('Ok Pressed') },
          ]);
        }, 100);
        navigation.navigate('Welcome');
      })
      .catch((error) => {
        setLoading(false);
        console.error('Logout error:', error);
        Alert.alert('Logout Error', 'An error occurred while logging out.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      });
  };

  const navigateToPastReservations = () => {
    navigation.navigate('reservation');
  };

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Text style={styles.greetingText}>
          Welcome, {currentUser ? currentUser : 'Guest'}
        </Text>
      </View>
      <TouchableOpacity onPress={onLogout} disabled={loading}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      <TouchableOpacity onPress={navigateToPastReservations}>
        <Text style={styles.logoutText}>View Past Reservations</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  user: {
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutText: {
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginVertical: 5,
  },
});

export default ProfileScreen;
