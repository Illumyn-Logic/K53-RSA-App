import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { QuestionCard } from '@/components/ui/QuestionCard';
import { getQuestions } from '@/utils/testEngine';
import type { Question } from '@/store/useAppStore';

export default function TestScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; category?: string; questionCount?: string }>();
  const { startTest, answerQuestion, submitTest, currentTest } = useAppStore();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    const category = params.category ?? 'road_rules';
    const count = Number.parseInt(params.questionCount ?? '20', 10);
    const selectedQuestions = getQuestions(category, count);
    setQuestions(selectedQuestions);
    startTest(category, selectedQuestions);
  }, [params.category, params.questionCount, startTest]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentQ = questions[currentIndex];
  const total = questions.length;

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    answerQuestion(currentIndex, index);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex >= total - 1) return;
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    const existing = currentTest?.answers[nextIndex] ?? null;
    setSelectedAnswer(existing);
    setShowExplanation(existing !== null);
  };

  const handlePrev = () => {
    if (currentIndex <= 0) return;
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    const existing = currentTest?.answers[prevIndex] ?? null;
    setSelectedAnswer(existing);
    setShowExplanation(existing !== null);
  };

  const handleSubmit = () => {
    const result = submitTest();
    router.push({
      pathname: '/test/results',
      params: { result: JSON.stringify(result) },
    });
  };

  if (!currentQ) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.questionCounter}>
          Question {currentIndex + 1}/{total}
        </Text>
        <Text style={styles.timer}>
          ⏱️ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </Text>
      </View>

      <ProgressBar progress={(currentIndex + 1) / total} height={6} />

      <QuestionCard
        question={currentQ}
        selectedAnswer={selectedAnswer}
        onSelect={handleAnswer}
        showExplanation={showExplanation}
      />

      <View style={styles.navButtons}>
        <TouchableOpacity onPress={handlePrev} disabled={currentIndex === 0} style={[styles.navButton, currentIndex === 0 && styles.disabled]}>
          <Text style={styles.navText}>Prev</Text>
        </TouchableOpacity>

        {currentIndex === total - 1 ? (
          <TouchableOpacity onPress={handleSubmit} style={[styles.navButton, styles.submitButton]}>
            <Text style={[styles.navText, { color: '#fff' }]}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleNext} style={styles.navButton}>
            <Text style={styles.navText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  questionCounter: { fontSize: 16, fontWeight: '500' },
  timer: { fontSize: 16, color: '#007AFF' },
  navButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  navButton: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, backgroundColor: '#e0e0e0' },
  disabled: { opacity: 0.5 },
  submitButton: { backgroundColor: '#007AFF' },
  navText: { fontSize: 16, fontWeight: '600' },
});
