import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { storage, store } from '@/firebase';  // Assurez-vous que Firebase est bien configuré
import * as ImagePicker from 'expo-image-picker';  // Utilisation de l'API ImagePicker pour la caméra et la galerie
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function App() {
  
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);



  // Fonction pour choisir une image depuis la galerie
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

  // Fonction pour prendre une photo avec la caméra
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

  // Fonction pour télécharger l'image sur Firebase Storage
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
      Alert.alert("Image uploadée avec succès : " + downloadURL);
      setImage(null);
  
      // Optionnel : vous pouvez enregistrer le lien dans Firestore
      await addDoc(collection(store, "images"), {
        imageUrl: downloadURL,
        timestamp: new Date(),
      });
    } catch (error: any) { // Spécifiez le type d'erreur ici
      Alert.alert("Erreur lors du téléchargement de l'image : " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Choisir une image depuis la galerie" onPress={pickImageFromGallery} />
      <Button title="Prendre une photo avec la caméra" onPress={takePhotoWithCamera} />
      {image && (
        <View>
          <Image source={{ uri: image }} style={styles.image} />
          <Button title={uploading ? "Téléchargement..." : "Télécharger la photo"} onPress={uploadImage} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: "80%",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});
