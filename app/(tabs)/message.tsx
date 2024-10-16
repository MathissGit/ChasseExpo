import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { store } from '@/firebase'; // Chemin vers firebase.js

export default function SendMessageScreen() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fonction pour envoyer un message dans Firestore
  const handleSendMessage = async () => {
    if (subject.trim() === '' || message.trim() === '') {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    setLoading(true);

    try {
      // Ajouter le message dans Firestore
      await addDoc(collection(store, 'messages'), {
        subject,
        message,
        timestamp: new Date(),
      });

      Alert.alert('Success', 'Your message has been sent successfully!');
      setSubject('');
      setMessage('');
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Envoyer un message</Text>
      </View>

      <View style={styles.form}>
        {/* Sujet du message */}
        <Text style={styles.label}>Sujet</Text>
        <TextInput
          style={styles.input}
          placeholder="Objet du message"
          value={subject}
          onChangeText={setSubject}
        />

        {/* Contenu du message */}
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ecrire un message ici..."
          value={message}
          onChangeText={setMessage}
          multiline={true}
          numberOfLines={6}
        />

        {/* Bouton d'envoi */}
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
          disabled={loading}
        >
          <Text style={styles.sendButtonText}>
            {loading ? 'Envoie...' : 'Envoyer le message'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F9D342',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#2D2D2D',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#FFF6E0',
    borderRadius: 10,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#C4A484',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#6B4226',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFF6E0',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
