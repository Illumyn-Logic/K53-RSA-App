import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import learnerGuide from '@/data/learnerGuide.json';

export default function LearnersGuideScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>Learner&apos;s Licence Guide</Text>
      <Text style={styles.subtitle}>Official journey basics from the learner process and K53 preparation material.</Text>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>{learnerGuide.whyItMatters.title}</Text>
        <Text style={styles.body}>{learnerGuide.whyItMatters.description}</Text>
        <Text style={styles.highlight}>{learnerGuide.whyItMatters.validity}</Text>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Application Channels</Text>
        {learnerGuide.applicationChannels.map((channel) => (
          <Text key={channel} style={styles.listItem}>
            • {channel}
          </Text>
        ))}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Licence Categories and Ages</Text>
        {learnerGuide.categories.map((category) => (
          <View key={category.id} style={styles.categoryRow}>
            <Text style={styles.categoryTitle}>{category.display}</Text>
            <Text style={styles.categoryMeta}>Official learner category: {category.officialEquivalent}</Text>
            <Text style={styles.categoryMeta}>Vehicle type: {category.vehicleType}</Text>
            <Text style={styles.categoryMeta}>Minimum age: {category.ageRequirement}</Text>
          </View>
        ))}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Required Documents</Text>
        {learnerGuide.requiredDocuments.map((item) => (
          <Text key={item} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Forms and Checks</Text>
        {learnerGuide.formsAndChecks.map((item) => (
          <Text key={item} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>What To Study</Text>
        {learnerGuide.studyAreas.map((item) => (
          <Text key={item} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Test Day Checklist</Text>
        {learnerGuide.testDayChecklist.map((item) => (
          <Text key={item} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </Card>

      <Button title="Go to Study" onPress={() => router.push('/(tabs)/study')} style={styles.button} />
      <Button title="Go to Practice" onPress={() => router.push('/(tabs)/practice')} style={styles.button} variant="outline" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 16 },
  card: { marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 8 },
  body: { fontSize: 14, color: '#333', lineHeight: 20 },
  highlight: { fontSize: 13, color: '#1d4ed8', marginTop: 8, fontWeight: '600' },
  listItem: { fontSize: 14, color: '#333', marginBottom: 5 },
  categoryRow: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#fafafa',
  },
  categoryTitle: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  categoryMeta: { fontSize: 13, color: '#444', marginBottom: 2 },
  button: { marginTop: 8 },
});