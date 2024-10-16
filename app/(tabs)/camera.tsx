import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { storage, store } from '@/firebase'; 
import * as ImagePicker from 'expo-image-picker'; 
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission nécessaire pour accéder à la galerie');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhotoWithCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission nécessaire pour utiliser la caméra');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("Aucune image à télécharger");
      return;
    }

    setUploading(true);
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, `images/${Date.now()}.jpg`);

      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      Alert.alert("Image uploadée avec succès");
      setImage(null);

      await addDoc(collection(store, "images"), {
        imageUrl: downloadURL,
        timestamp: new Date(),
      });
    } catch (error: any) { 
      Alert.alert("Erreur lors du téléchargement de l'image : " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Envoyer une photo</Text>
      <TouchableOpacity style={styles.captureButton} onPress={pickImageFromGallery}>
        <Text style={styles.buttonText}>Choisir une image depuis la galerie</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.captureButton} onPress={takePhotoWithCamera}>
        <Text style={styles.buttonText}>Prendre une photo avec la caméra</Text>
      </TouchableOpacity>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>
              {uploading ? "Téléchargement..." : "Télécharger la photo"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9D342',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  captureButton: {
    backgroundColor: '#6B4226',
    padding: 16,
    borderRadius: 10,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#4E7039',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
});
