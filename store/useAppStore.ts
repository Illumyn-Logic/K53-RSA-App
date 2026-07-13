import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { storage } from '@/utils/storage';

export type VehicleType = 'code8' | 'code10' | 'code1';

export type Question = {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type TestResult = {
  id: string;
  date: string;
  category: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  vehicleType: VehicleType;
  weakAreas?: string[];
};

type CurrentTest = {
  questions: Question[];
  answers: Array<number | null>;
  category: string;
};

type AppState = {
  onboardingCompleted: boolean;
  selectedVehicleType: VehicleType;
  testHistory: TestResult[];
  currentTest: CurrentTest | null;

  setOnboardingCompleted: (completed: boolean) => void;
  setVehicleType: (type: VehicleType) => void;
  startTest: (category: string, questions: Question[]) => void;
  answerQuestion: (questionIndex: number, answerIndex: number) => void;
  submitTest: () => TestResult;
  clearHistory: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      onboardingCompleted: false,
      selectedVehicleType: 'code8',
      testHistory: [],
      currentTest: null,

      setOnboardingCompleted: (completed) => set({ onboardingCompleted: completed }),

      setVehicleType: (type) => set({ selectedVehicleType: type }),

      startTest: (category, questions) => {
        set({
          currentTest: {
            questions,
            answers: new Array(questions.length).fill(null),
            category,
          },
        });
      },

      answerQuestion: (questionIndex, answerIndex) => {
        const { currentTest } = get();
        if (!currentTest) return;

        const answers = [...currentTest.answers];
        answers[questionIndex] = answerIndex;

        set({
          currentTest: {
            ...currentTest,
            answers,
          },
        });
      },

      submitTest: () => {
        const { currentTest, selectedVehicleType, testHistory } = get();
        if (!currentTest) throw new Error('No active test');

        const { questions, answers, category } = currentTest;
        let correct = 0;
        const weakAreas: string[] = [];

        questions.forEach((question, idx) => {
          if (answers[idx] === question.correctAnswer) {
            correct += 1;
            return;
          }

          if (!weakAreas.includes(question.category)) {
            weakAreas.push(question.category);
          }
        });

        const total = questions.length;
        const score = Math.round((correct / total) * 100);

        const result: TestResult = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          category,
          totalQuestions: total,
          correctAnswers: correct,
          score,
          vehicleType: selectedVehicleType,
          weakAreas,
        };

        set({
          testHistory: [result, ...testHistory],
          currentTest: null,
        });

        return result;
      },

      clearHistory: () => set({ testHistory: [] }),
    }),
    {
      name: 'k53-app-store',
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({
        onboardingCompleted: state.onboardingCompleted,
        selectedVehicleType: state.selectedVehicleType,
        testHistory: state.testHistory,
      }),
    }
  )
);
