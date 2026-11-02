import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function ProgressScreen() {
  const testHistory = useAppStore((state) => state.testHistory);
  const gamification = useAppStore((state) => state.gamification);

  const totalTests = testHistory.length;
  const averageScore = totalTests > 0 ? Math.round(testHistory.reduce((sum, t) => sum + t.score, 0) / totalTests) : 0;
  const passCount = testHistory.filter((t) => t.score >= 80).length;

  const categoryStats: Record<string, { total: number; passed: number }> = {};
  testHistory.forEach((test) => {
    if (!categoryStats[test.category]) {
      categoryStats[test.category] = { total: 0, passed: 0 };
    }
    categoryStats[test.category].total += 1;
    if (test.score >= 80) categoryStats[test.category].passed += 1;
  });

  const weakAreas = Object.entries(categoryStats)
    .filter(([, stats]) => stats.passed / stats.total < 0.7)
    .map(([category]) => category);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Progress</Text>

      <Card style={styles.heroCard}>
        <Text style={styles.heroTitle}>Level Up</Text>
        <Text style={styles.heroValue}>{gamification.xp} XP</Text>
        <Text style={styles.heroText}>Current streak: {gamification.streak} days</Text>
        {gamification.badges.length > 0 ? (
          <Text style={styles.heroText}>Badges: {gamification.badges.join(', ')}</Text>
        ) : (
          <Text style={styles.heroText}>Keep practicing to unlock badges.</Text>
        )}
      </Card>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{totalTests}</Text>
          <Text style={styles.statLabel}>Tests</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{averageScore}%</Text>
          <Text style={styles.statLabel}>Average</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{passCount}</Text>
          <Text style={styles.statLabel}>Passed</Text>
        </Card>
      </View>

      {weakAreas.length > 0 && (
        <View style={styles.weakSection}>
          <Text style={styles.sectionTitle}>⚠️ Weak Areas</Text>
          {weakAreas.map((area) => (
            <Text key={area} style={styles.weakItem}>
              • {area}
            </Text>
          ))}
          <Text style={styles.weakHint}>Focus more study on these topics.</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Test History</Text>
      {testHistory.length === 0 ? (
        <Text style={styles.emptyText}>No tests taken yet.</Text>
      ) : (
        <FlatList
          data={testHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.historyCard}>
              <View style={styles.historyRow}>
                <View>
                  <Text style={styles.historyCategory}>{item.category}</Text>
                  <Text style={styles.historyDate}>{new Date(item.date).toLocaleDateString()}</Text>
                </View>
                <Text style={[styles.historyScore, { color: item.score >= 80 ? 'green' : 'orange' }]}>{item.score}%</Text>
              </View>
              <ProgressBar progress={item.score / 100} height={6} />
            </Card>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  heroCard: { marginBottom: 16, backgroundColor: '#fef3c7' },
  heroTitle: { fontSize: 14, fontWeight: '700', color: '#92400e' },
  heroValue: { fontSize: 24, fontWeight: '800', marginTop: 4 },
  heroText: { fontSize: 13, color: '#444', marginTop: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { flex: 1, marginHorizontal: 4, alignItems: 'center', padding: 12 },
  statNumber: { fontSize: 22, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#666' },
  weakSection: { backgroundColor: '#fff3cd', padding: 12, borderRadius: 8, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  weakItem: { fontSize: 14, marginLeft: 8, marginVertical: 2 },
  weakHint: { fontSize: 12, color: '#856404', marginTop: 4 },
  emptyText: { color: '#999', textAlign: 'center', marginVertical: 10 },
  historyCard: { padding: 12, marginBottom: 8 },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  historyCategory: { fontWeight: '500' },
  historyDate: { fontSize: 12, color: '#999' },
  historyScore: { fontSize: 18, fontWeight: 'bold' },
});
