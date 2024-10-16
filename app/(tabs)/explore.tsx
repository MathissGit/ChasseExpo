import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';

export default function SendMessageScreen() {
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
        <TextInput style={styles.input} placeholder="What's this about?" />

        {/* Contenu du message */}
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write your message here..."
          multiline={true}
          numberOfLines={6}
        />

        {/* Bouton d'envoi */}
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F9D342', // Fond jaune sable pour correspondre au thème
    padding: 16,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D2D2D', // Texte foncé pour contraster
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#2D2D2D',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#FFF6E0', // Fond beige pour le formulaire
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
    backgroundColor: '#FFF', // Blanc pour le champ de texte
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#C4A484', // Bordure sable clair pour rester dans le thème
  },
  textArea: {
    height: 100, // Plus grand pour permettre d'écrire plusieurs lignes
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#6B4226', // Couleur brune pour le bouton
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFF6E0', // Texte beige clair
    fontSize: 18,
    fontWeight: 'bold',
  },
});
