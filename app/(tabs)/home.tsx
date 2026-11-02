import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import resourcesData from '@/data/resources.json';

export default function HomeScreen() {
  const router = useRouter();
  const testHistory = useAppStore((state) => state.testHistory);
  const gamification = useAppStore((state) => state.gamification);
  const completeDailyCheckIn = useAppStore((state) => state.completeDailyCheckIn);

  const totalTests = testHistory.length;
  const bestScore = totalTests > 0 ? Math.max(...testHistory.map((t) => t.score)) : 0;
  const totalQuestions = 255;
  const level = Math.floor(gamification.xp / 250) + 1;
  const xpIntoLevel = gamification.xp % 250;
  const xpProgress = xpIntoLevel / 250;
  const xpToNext = 250 - xpIntoLevel;

  const missions = [
    { title: 'Daily Drive', detail: 'Complete one practice set', reward: '+25 XP', progress: totalTests > 0 ? 1 : 0.35 },
    { title: 'Road Rules', detail: 'Study a topic cluster', reward: '+40 XP', progress: 0.6 },
    { title: 'Motorcycle Path', detail: 'Finish one module', reward: '+50 XP', progress: 0.4 },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.greeting}>Good morning! 👋</Text>
      <Text style={styles.subGreeting}>Your road to the learner licence starts here.</Text>

      <Card style={styles.heroCard}>
        <Text style={styles.levelTag}>LEVEL {level}</Text>
        <Text style={styles.heroTitle}>Road Rookie</Text>
        <Text style={styles.heroValue}>{gamification.xp} XP</Text>
        <ProgressBar progress={xpProgress} height={10} color="#1d4ed8" />
        <Text style={styles.heroText}>{xpToNext} XP to next level</Text>
        <Button title="Daily Check-In +25 XP" onPress={completeDailyCheckIn} style={styles.heroButton} />
      </Card>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{totalQuestions}</Text>
          <Text style={styles.statLabel}>Questions</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{totalTests}</Text>
          <Text style={styles.statLabel}>Tests</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{bestScore}%</Text>
          <Text style={styles.statLabel}>Best</Text>
        </Card>
      </View>

      <Card style={styles.missionCard}>
        <Text style={styles.sectionTitle}>Mission Board</Text>
        {missions.map((mission) => (
          <View key={mission.title} style={styles.missionRow}>
            <View style={styles.missionTextWrap}>
              <Text style={styles.missionTitle}>{mission.title}</Text>
              <Text style={styles.missionDetail}>{mission.detail}</Text>
            </View>
            <Text style={styles.reward}>{mission.reward}</Text>
          </View>
        ))}
      </Card>

      <View style={styles.quickActions}>
        <Button title="🎮 Quick Play" onPress={() => router.push('/practice')} style={styles.actionButton} />
        <Button title="📚 Study" onPress={() => router.push('/study')} style={styles.actionButton} variant="outline" />
        <Button title="✅ Learner Guide" onPress={() => router.push('/learners-guide')} style={styles.actionButton} variant="outline" />
        <Button title="📊 Progress" onPress={() => router.push('/progress')} style={styles.actionButton} variant="outline" />
      </View>

      <Text style={styles.sectionTitle}>Study Resources</Text>
      {resourcesData.resources.slice(0, 2).map((resource) => (
        <Card key={resource.id} style={styles.resourceCard}>
          <Text style={styles.resourceTitle}>{resource.title}</Text>
          <Text style={styles.resourceText}>{resource.summary}</Text>
        </Card>
      ))}

      <Button title="🏍️ Motorcycle Path" onPress={() => router.push('/motorcycle')} style={styles.actionButton} variant="outline" />

      <Text style={styles.sectionTitle}>Recent Tests</Text>
      {testHistory.length === 0 ? (
        <Text style={styles.emptyText}>No tests taken yet. Start practicing!</Text>
      ) : (
        testHistory
          .slice(0, 3)
          .map((test) => (
            <Card key={test.id} style={styles.recentCard}>
              <View style={styles.recentRow}>
                <Text style={styles.recentCategory}>{test.category}</Text>
                <Text style={[styles.recentScore, { color: test.score >= 80 ? 'green' : 'orange' }]}>{test.score}%</Text>
              </View>
              <Text style={styles.recentDate}>{new Date(test.date).toLocaleDateString()}</Text>
            </Card>
          ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  greeting: { fontSize: 24, fontWeight: 'bold' },
  subGreeting: { fontSize: 16, color: '#666', marginBottom: 16 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  heroCard: { marginBottom: 16, backgroundColor: '#eef6ff', borderWidth: 1, borderColor: '#dbeafe' },
  levelTag: { fontSize: 12, fontWeight: '700', color: '#1d4ed8', letterSpacing: 1.2 },
  heroTitle: { fontSize: 18, fontWeight: '800', marginTop: 4 },
  heroValue: { fontSize: 28, fontWeight: '800', marginTop: 4 },
  heroText: { fontSize: 13, color: '#444', marginTop: 8, marginBottom: 10 },
  heroButton: { marginTop: 4 },
  statCard: { flex: 1, marginHorizontal: 4, alignItems: 'center', padding: 12, backgroundColor: '#fff' },
  statNumber: { fontSize: 22, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#666' },
  missionCard: { marginBottom: 18, backgroundColor: '#fff7ed' },
  missionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  missionTextWrap: { flex: 1, marginRight: 12 },
  missionTitle: { fontSize: 14, fontWeight: '700' },
  missionDetail: { fontSize: 12, color: '#666', marginTop: 2 },
  reward: { fontSize: 12, fontWeight: '700', color: '#f97316' },
  quickActions: { marginBottom: 18 },
  actionButton: { marginVertical: 6 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  resourceCard: { padding: 12, marginBottom: 8 },
  resourceTitle: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  resourceText: { fontSize: 13, color: '#555' },
  emptyText: { color: '#999', textAlign: 'center', marginVertical: 10 },
  recentCard: { padding: 12, marginBottom: 8 },
  recentRow: { flexDirection: 'row', justifyContent: 'space-between' },
  recentCategory: { fontWeight: '500' },
  recentScore: { fontWeight: 'bold' },
  recentDate: { fontSize: 12, color: '#999', marginTop: 4 },
});
