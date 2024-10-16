import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { store } from '@/firebase'; // Chemin vers firebase.js

export default function SendMessageScreen() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

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

      // Recharger les messages après envoi
      fetchMessages();
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour récupérer les messages de Firestore
  const fetchMessages = async () => {
    try {
      const querySnapshot = await getDocs(collection(store, 'messages'));
      const fetchedMessages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages: ', error);
    }
  };

  // Charger les messages lors du montage du composant
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Send a Message</Text>
        <Text style={styles.subtitle}>
          Reach out to fellow adventurers or ask for help on your next quest!
        </Text>
      </View>

      <View style={styles.form}>
        {/* Sujet du message */}
        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="What's this about?"
          value={subject}
          onChangeText={setSubject}
        />

        {/* Contenu du message */}
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write your message here..."
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
            {loading ? 'Sending...' : 'Send Message'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.messageList}>
        <Text style={styles.messageListTitle}>Messages</Text>
        {messages.map(msg => (
          <View key={msg.id} style={styles.messageItem}>
            <Text style={styles.messageSubject}>{msg.subject}</Text>
            <Text style={styles.messageText}>{msg.message}</Text>
            <Text style={styles.messageTimestamp}>{new Date(msg.timestamp?.toDate()).toLocaleString()}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F9D342',
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
  messageList: {
    marginTop: 20,
  },
  messageListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#FFF6E0',
    borderRadius: 8,
  },
  messageSubject: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
});
