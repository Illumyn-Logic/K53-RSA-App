import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Question } from '@/store/useAppStore';

type QuestionCardProps = {
  question: Question;
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
  showExplanation: boolean;
};

export function QuestionCard({ question, selectedAnswer, onSelect, showExplanation }: QuestionCardProps) {
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question.question}</Text>
      {question.options.map((option, idx) => {
        const isSelected = selectedAnswer === idx;
        const isCorrect = idx === question.correctAnswer;
        let backgroundColor = '#f0f0f0';

        if (selectedAnswer !== null && showExplanation) {
          if (isCorrect) backgroundColor = '#d4edda';
          else if (isSelected) backgroundColor = '#f8d7da';
        } else if (isSelected) {
          backgroundColor = '#cce5ff';
        }

        return (
          <TouchableOpacity
            key={`${question.id}-${idx}`}
            style={[styles.option, { backgroundColor }]}
            onPress={() => onSelect(idx)}
            disabled={selectedAnswer !== null && showExplanation}
          >
            <Text style={styles.optionText}>
              {letters[idx]}. {option}
            </Text>
          </TouchableOpacity>
        );
      })}

      {showExplanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>Explanation</Text>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: { fontSize: 18, fontWeight: '500', marginBottom: 16 },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionText: { fontSize: 16 },
  explanationContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  explanationTitle: { fontWeight: 'bold', marginBottom: 4 },
  explanationText: { fontSize: 14, color: '#333' },
});
