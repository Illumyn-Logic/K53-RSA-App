import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function HomeScreen() {
  const router = useRouter();
  const testHistory = useAppStore((state) => state.testHistory);

  const totalTests = testHistory.length;
  const bestScore = totalTests > 0 ? Math.max(...testHistory.map((t) => t.score)) : 0;
  const totalQuestions = 255;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.greeting}>Good morning! 👋</Text>
      <Text style={styles.subGreeting}>Ready to study?</Text>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{totalQuestions}</Text>
          <Text style={styles.statLabel}>Questions</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{totalTests}</Text>
          <Text style={styles.statLabel}>Tests Taken</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{bestScore}%</Text>
          <Text style={styles.statLabel}>Best Score</Text>
        </Card>
      </View>

      <View style={styles.quickActions}>
        <Button title="📝 Practice Test" onPress={() => router.push('/practice')} style={styles.actionButton} />
        <Button title="📚 Study" onPress={() => router.push('/study')} style={styles.actionButton} variant="outline" />
        <Button title="📊 Progress" onPress={() => router.push('/progress')} style={styles.actionButton} variant="outline" />
      </View>

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
  subGreeting: { fontSize: 16, color: '#666', marginBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { flex: 1, marginHorizontal: 4, alignItems: 'center', padding: 12 },
  statNumber: { fontSize: 22, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#666' },
  quickActions: { marginBottom: 20 },
  actionButton: { marginVertical: 6 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  emptyText: { color: '#999', textAlign: 'center', marginVertical: 10 },
  recentCard: { padding: 12, marginBottom: 8 },
  recentRow: { flexDirection: 'row', justifyContent: 'space-between' },
  recentCategory: { fontWeight: '500' },
  recentScore: { fontWeight: 'bold' },
  recentDate: { fontSize: 12, color: '#999', marginTop: 4 },
});
