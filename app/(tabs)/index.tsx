import { StyleSheet, ScrollView, View, Text, useWindowDimensions } from 'react-native';

export default function ProfileScreen() {
  const { width } = useWindowDimensions();

  const isSmallScreen = width < 600;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header section */}
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarInitials}>CE</Text> {/* Initiales à la place de l'image */}
        </View>
        <Text style={styles.username}>Captain Explorer</Text> {/* Nom d'utilisateur */}
      </View>

      {/* User stats */}
      <View style={[styles.statsContainer, isSmallScreen ? styles.column : styles.row]}>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: '#C89B3C' }]} /> {/* Couleur or */}
          <Text style={styles.statLabel}>Gold Coins</Text>
          <Text>154</Text> {/* Nombre */}
        </View>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: '#3C6E71' }]} /> {/* Couleur boussole */}
          <Text style={styles.statLabel}>Quests Completed</Text>
          <Text>12</Text> {/* Nombre */}
        </View>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: '#6B4226' }]} /> {/* Couleur bois */}
          <Text style={styles.statLabel}>Treasure Found</Text>
          <Text>5</Text> {/* Nombre */}
        </View>
      </View>

      {/* Bio section */}
      <View style={styles.bioContainer}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.bioText}>
          An adventurer at heart, I roam the world in search of hidden treasures. From mysterious jungles to ancient ruins, no challenge is too great!
        </Text>
      </View>

      {/* Rewards / Achievements */}
      <View style={styles.rewardsContainer}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementRow}>
          <View style={[styles.achievementItem, { backgroundColor: '#FFD700' }]}> {/* Or pour médaille */}
            <Text style={styles.achievementText}>Explorer Badge</Text>
          </View>
          <View style={[styles.achievementItem, { backgroundColor: '#8A4B08' }]}> {/* Marron pour clé */}
            <Text style={styles.achievementText}>Key Holder</Text>
          </View>
          <View style={[styles.achievementItem, { backgroundColor: '#C4A484' }]}> {/* Sable pour parchemin */}
            <Text style={styles.achievementText}>Map Reader</Text>
          </View>
        </View>
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
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarPlaceholder: {
    height: 100,
    width: 100,
    backgroundColor: '#6B4226', 
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarInitials: {
    color: '#FFF6E0', 
    fontSize: 36,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D2D2D', 
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#FFF6E0', 
    borderRadius: 10,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1, 
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
    color: '#2D2D2D', 
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
    flexDirection: 'column', 
    justifyContent: 'space-between',
  },
  achievementItem: {
    padding: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700', 
    marginBottom: 10,
    flex: 1, 
    width: '100%', 
  },
  achievementText: {
    fontSize: 14,
    color: '#2D2D2D',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
