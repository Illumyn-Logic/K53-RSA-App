import { StyleSheet, View } from 'react-native';

type ProgressBarProps = {
  progress: number;
  height?: number;
  color?: string;
};

export function ProgressBar({ progress, height = 8, color = '#007AFF' }: ProgressBarProps) {
  const normalized = Math.max(0, Math.min(progress, 1));

  return (
    <View style={[styles.container, { height }]}>
      <View style={[styles.fill, { width: `${normalized * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});
