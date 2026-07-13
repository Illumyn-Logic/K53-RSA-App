import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';

type Category = {
  id: string;
  name: string;
  icon: string;
  questionCount: number;
};

type CategoryCardProps = {
  category: Category;
  mastery: number;
  onPress: () => void;
};

export function CategoryCard({ category, mastery, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardTouch}>
      <Card style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.icon}>{category.icon}</Text>
          <View style={styles.details}>
            <Text style={styles.name}>{category.name}</Text>
            <Text style={styles.count}>{category.questionCount} questions</Text>
          </View>
          <Text style={styles.mastery}>{mastery}%</Text>
        </View>
        <ProgressBar progress={mastery / 100} height={4} />
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardTouch: { marginBottom: 12 },
  card: { padding: 12 },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { fontSize: 28, marginRight: 12 },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: '500' },
  count: { fontSize: 12, color: '#666' },
  mastery: { fontSize: 14, fontWeight: 'bold', color: '#007AFF' },
});
