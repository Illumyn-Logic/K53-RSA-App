import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type ParsedResult = {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  weakAreas?: string[];
};

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ result?: string }>();

  const parsedResult: ParsedResult | null = params.result ? JSON.parse(params.result) : null;

  if (!parsedResult) {
    return <Text>No result data</Text>;
  }

  const pass = parsedResult.score >= 80;
  const wrong = parsedResult.totalQuestions - parsedResult.correctAnswers;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.emoji}>{pass ? '🎉' : '😅'}</Text>
      <Text style={styles.score}>{parsedResult.score}%</Text>
      <Text style={[styles.passText, { color: pass ? 'green' : 'orange' }]}>
        {pass ? 'You passed the practice test!' : "Keep studying, you'll get it next time!"}
      </Text>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{parsedResult.correctAnswers}</Text>
          <Text style={styles.statLabel}>Correct</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{wrong}</Text>
          <Text style={styles.statLabel}>Wrong</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>-</Text>
          <Text style={styles.statLabel}>Time</Text>
        </Card>
      </View>

      <Text style={styles.sectionTitle}>Weak Areas</Text>
      {parsedResult.weakAreas && parsedResult.weakAreas.length > 0 ? (
        parsedResult.weakAreas.map((area) => (
          <Text key={area} style={styles.weakItem}>
            ⚠️ {area}
          </Text>
        ))
      ) : (
        <Text style={styles.emptyText}>No weak areas identified. Great job!</Text>
      )}

      <View style={styles.buttonRow}>
        <Button title="Review Answers" onPress={() => {}} variant="outline" style={styles.actionButton} />
        <Button title="Retry" onPress={() => router.back()} style={styles.actionButton} />
        <Button title="Home" onPress={() => router.push('/(tabs)/home')} style={styles.actionButton} variant="outline" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  emoji: { fontSize: 64, textAlign: 'center', marginBottom: 8 },
  score: { fontSize: 48, fontWeight: 'bold', textAlign: 'center' },
  passText: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { flex: 1, marginHorizontal: 4, alignItems: 'center', padding: 12 },
  statNumber: { fontSize: 22, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: '#666' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  weakItem: { fontSize: 14, marginLeft: 8, marginVertical: 2 },
  emptyText: { color: '#999', marginVertical: 8 },
  buttonRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 },
  actionButton: { flex: 1, marginHorizontal: 4, minWidth: 100 },
});
