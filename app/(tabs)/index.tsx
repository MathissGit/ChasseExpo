import { StyleSheet, ScrollView, View, Text, useWindowDimensions } from 'react-native';

export default function ProfileScreen() {
  const { width } = useWindowDimensions();

  // Si l'écran fait moins de 600 pixels de large (typiquement un téléphone), on met les éléments en colonne
  const isSmallScreen = width < 600;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarInitials}>CE</Text>
        </View>
        <Text style={styles.username}>Captain Explorer</Text>
      </View>

      <View style={[styles.statsContainer, isSmallScreen ? styles.column : styles.row]}>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: '#C89B3C' }]} />
          <Text style={styles.statLabel}>Gold Coins</Text>
          <Text>154</Text> 
        </View>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: '#3C6E71' }]} />
          <Text style={styles.statLabel}>Quests Completed</Text>
          <Text>12</Text>
        </View>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: '#6B4226' }]} /> 
          <Text style={styles.statLabel}>Treasure Found</Text>
          <Text>5</Text>
        </View>
      </View>

     
      <View style={styles.bioContainer}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.bioText}>
          An adventurer at heart, I roam the world in search of hidden treasures. From mysterious jungles to ancient ruins, no challenge is too great!
        </Text>
      </View>

      
      <View style={styles.rewardsContainer}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementRow}>
          <View style={[styles.achievementItem, { backgroundColor: '#FFD700' }]}> 
            <Text style={styles.achievementText}>Explorer Badge</Text>
          </View>
          <View style={[styles.achievementItem, { backgroundColor: '#8A4B08' }]}>
            <Text style={styles.achievementText}>Key Holder</Text>
          </View>
          <View style={[styles.achievementItem, { backgroundColor: '#C4A484' }]}>
            <Text style={styles.achievementText}>Map Reader</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Assure que le ScrollView occupe tout l'espace disponible
    backgroundColor: '#F9D342', // Fond jaune sable pour couvrir toute la page
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarPlaceholder: {
    height: 100,
    width: 100,
    backgroundColor: '#6B4226', // Brun boisé
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarInitials: {
    color: '#FFF6E0', // Beige clair pour contraster avec le fond brun
    fontSize: 36,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D2D2D', // Noir/gris foncé pour le contraste
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#FFF6E0', // Beige pour le contraste
    borderRadius: 10,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1, // Les éléments vont maintenant remplir l'espace disponible
  },
  statIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  bioContainer: {
    padding: 16,
    backgroundColor: '#FFF6E0',
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2D2D2D', // Gris foncé pour bien ressortir
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#2D2D2D',
  },
  rewardsContainer: {
    padding: 16,
    backgroundColor: '#FFF6E0',
    borderRadius: 10,
  },
  achievementRow: {
    flexDirection: 'column', // Les éléments seront empilés
    justifyContent: 'space-between',
  },
  achievementItem: {
    padding: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700', // Couleur par défaut pour la médaille
    marginBottom: 10,
    flex: 1, // Remplit l'espace horizontal
    width: '100%', // Occupe toute la largeur de l'écran
  },
  achievementText: {
    fontSize: 14,
    color: '#2D2D2D',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
