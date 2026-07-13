import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import categoriesData from '@/data/categories.json';
import questionsData from '@/data/questions.json';
import { Card } from '@/components/ui/Card';

export default function StudyCategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const category = categoriesData.categories.find((c) => c.id === id);
  const questions = questionsData.questions.filter((q) => q.category === id);

  if (!category) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Category not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>
        {category.icon} {category.name}
      </Text>
      <Text style={styles.subtitle}>Quick review notes</Text>

      {questions.map((q) => (
        <Card key={q.id} style={styles.card}>
          <Text style={styles.question}>{q.question}</Text>
          <Text style={styles.explanation}>{q.explanation}</Text>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  card: { marginBottom: 12 },
  question: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  explanation: { fontSize: 14, color: '#444' },
});
