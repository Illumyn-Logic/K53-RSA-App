import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import { CategoryCard } from '@/components/study/CategoryCard';
import categoriesData from '@/data/categories.json';

export default function StudyScreen() {
  const router = useRouter();
  const testHistory = useAppStore((state) => state.testHistory);

  const getMastery = (categoryId: string) => {
    const tests = testHistory.filter((t) => t.category === categoryId);
    if (tests.length === 0) return 0;
    const average = tests.reduce((sum, t) => sum + t.score, 0) / tests.length;
    return Math.round(average);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Study</Text>
      <FlatList
        data={categoriesData.categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <CategoryCard category={item} mastery={getMastery(item.id)} onPress={() => router.push(`/study/${item.id}`)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
});
