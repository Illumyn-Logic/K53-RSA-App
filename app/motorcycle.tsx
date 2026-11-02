import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import motorcycleModules from '@/data/motorcycleModules.json';

export default function MotorcycleScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>🏍️ Motorcycle Practice Path</Text>
      <Text style={styles.subtitle}>A gamified way to work through the motorcycle test modules from the manuals.</Text>

      <Card style={styles.heroCard}>
        <Text style={styles.heroTitle}>Current streak</Text>
        <Text style={styles.heroValue}>3 modules completed</Text>
        <Text style={styles.heroText}>Keep going to unlock the next challenge.</Text>
      </Card>

      {motorcycleModules.modules.map((module, index) => (
        <Card key={module.id} style={styles.moduleCard}>
          <View style={styles.moduleHeader}>
            <Text style={styles.moduleTitle}>{index + 1}. {module.title}</Text>
            <Text style={styles.badge}>{module.xp} XP</Text>
          </View>
          <Text style={styles.moduleDescription}>{module.description}</Text>
          {module.steps.map((step) => (
            <Text key={step} style={styles.step}>• {step}</Text>
          ))}
        </Card>
      ))}

      <Button title="Back to Study" onPress={() => router.back()} style={styles.button} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  heroCard: { marginBottom: 12, backgroundColor: '#eef6ff' },
  heroTitle: { fontSize: 14, fontWeight: '700', color: '#1d4ed8' },
  heroValue: { fontSize: 22, fontWeight: '800', marginTop: 4 },
  heroText: { fontSize: 13, color: '#444', marginTop: 4 },
  moduleCard: { marginBottom: 12 },
  moduleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  moduleTitle: { fontSize: 16, fontWeight: '700', flex: 1 },
  badge: { fontSize: 12, fontWeight: '700', color: '#007AFF' },
  moduleDescription: { fontSize: 13, color: '#444', marginBottom: 6 },
  step: { fontSize: 13, color: '#333', marginBottom: 3 },
  button: { marginTop: 8 },
});
