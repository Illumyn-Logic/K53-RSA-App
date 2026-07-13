import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import categoriesData from '@/data/categories.json';

export default function PracticeScreen() {
  const router = useRouter();
  const setVehicleType = useAppStore((state) => state.setVehicleType);
  const selectedVehicle = useAppStore((state) => state.selectedVehicleType);

  const [category, setCategory] = useState(categoriesData.categories[0].id);
  const [questionCount, setQuestionCount] = useState(20);
  const [vehicleType, setVehicleTypeLocal] = useState<'code8' | 'code10' | 'code1'>(selectedVehicle);

  const startTest = () => {
    setVehicleType(vehicleType);
    router.push({
      pathname: '/test/[id]',
      params: {
        id: 'new',
        category,
        questionCount: String(questionCount),
        vehicleType,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Practice Test</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Category</Text>
        <Picker selectedValue={category} onValueChange={(value) => setCategory(String(value))} style={styles.picker}>
          {categoriesData.categories.map((c) => (
            <Picker.Item key={c.id} label={c.name} value={c.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Questions</Text>
        <Picker
          selectedValue={questionCount}
          onValueChange={(value) => setQuestionCount(Number(value))}
          style={styles.picker}
        >
          <Picker.Item label="10" value={10} />
          <Picker.Item label="20" value={20} />
          <Picker.Item label="30" value={30} />
          <Picker.Item label="50" value={50} />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Vehicle Type</Text>
        <Picker
          selectedValue={vehicleType}
          onValueChange={(value) => setVehicleTypeLocal(value as 'code8' | 'code10' | 'code1')}
          style={styles.picker}
        >
          <Picker.Item label="Code 8 (Car)" value="code8" />
          <Picker.Item label="Code 10 (Heavy)" value="code10" />
          <Picker.Item label="Code 1 (Motorcycle)" value="code1" />
        </Picker>
      </View>

      <Button title="START TEST" onPress={startTest} style={styles.startButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  pickerContainer: { marginBottom: 16, backgroundColor: '#fff', borderRadius: 8, padding: 8 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
  picker: { height: 50, width: '100%' },
  startButton: { marginTop: 20 },
});
