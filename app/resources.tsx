import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import resourcesData from '@/data/resources.json';
import learnerGuide from '@/data/learnerGuide.json';
import topicMap from '@/data/topicMap.json';

export default function ResourcesScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>📄 Study Resources</Text>
      <Text style={styles.subtitle}>Preview the core K53 manual topics and open the downloaded material later.</Text>

      <Card style={styles.card}>
        <Text style={styles.resourceTitle}>Official Study Areas</Text>
        {learnerGuide.studyAreas.map((item) => (
          <Text key={item} style={styles.highlight}>
            • {item}
          </Text>
        ))}
      </Card>

      {resourcesData.resources.map((resource) => (
        <Card key={resource.id} style={styles.card}>
          <Text style={styles.resourceTitle}>{resource.title}</Text>
          <Text style={styles.summary}>{resource.summary}</Text>
          {resource.highlights.map((item) => (
            <Text key={item} style={styles.highlight}>• {item}</Text>
          ))}
          <Text style={styles.source}>Source: {resource.source}</Text>
        </Card>
      ))}

      <Text style={styles.sectionTitle}>Rules Topic Coverage</Text>
      {topicMap.topicGroups.map((group) => (
        <Card key={group.id} style={styles.card}>
          <Text style={styles.resourceTitle}>{group.title}</Text>
          {group.topics.map((topic) => (
            <Text key={topic} style={styles.highlight}>
              • {topic}
            </Text>
          ))}
        </Card>
      ))}

      <Button title="Open Learner Guide" onPress={() => router.push('/learners-guide')} style={styles.button} variant="outline" />
      <Button title="Back to Study" onPress={() => router.back()} style={styles.button} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8, marginTop: 4 },
  card: { marginBottom: 12 },
  resourceTitle: { fontSize: 17, fontWeight: '700', marginBottom: 6 },
  summary: { fontSize: 14, color: '#444', marginBottom: 8 },
  highlight: { fontSize: 13, color: '#333', marginBottom: 4 },
  source: { fontSize: 12, color: '#007AFF', marginTop: 6 },
  button: { marginTop: 8 },
});
