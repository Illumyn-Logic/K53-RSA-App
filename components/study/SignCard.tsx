import { Image, StyleSheet, Text } from 'react-native';
import { Card } from '@/components/ui/Card';

type Sign = {
  name: string;
  description: string;
  category: string;
  imageUrl: string;
};

type SignCardProps = {
  sign: Sign;
};

export function SignCard({ sign }: SignCardProps) {
  return (
    <Card style={styles.card}>
      <Image source={{ uri: sign.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{sign.name}</Text>
      <Text style={styles.description}>{sign.description}</Text>
      <Text style={styles.category}>{sign.category}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, alignItems: 'center' },
  image: { width: 80, height: 80, resizeMode: 'contain', marginBottom: 8 },
  name: { fontSize: 16, fontWeight: '600' },
  description: { fontSize: 14, color: '#555' },
  category: { fontSize: 12, color: '#999', marginTop: 4 },
});
