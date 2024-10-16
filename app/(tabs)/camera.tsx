import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '@/firebase'; 

export default function TakePhotoScreen() {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  const takePhoto = async () => {

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const uploadImage = async () => {
    if (imageUri) {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const ref = storage.ref().child(new Date().toISOString());
      setUploading(true);

      ref.put(blob)
        .then(() => {
          setUploading(false);
          alert('Photo uploaded successfully!');
          setImageUri(null);
        })
        .catch((error) => {
          setUploading(false);
          alert('Error uploading photo: ' + error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Capture Your Treasure!</Text>
      <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>

      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>
              {uploading ? 'Uploading...' : 'Upload Photo'}
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
  captureButton: {
    backgroundColor: '#6B4226',
    padding: 16,
    borderRadius: 10,
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
  },
});
