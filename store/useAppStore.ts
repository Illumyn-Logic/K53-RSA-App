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

export type GamificationState = {
  xp: number;
  streak: number;
  badges: string[];
  lastActiveDate: string | null;
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
  gamification: GamificationState;

  setOnboardingCompleted: (completed: boolean) => void;
  setVehicleType: (type: VehicleType) => void;
  startTest: (category: string, questions: Question[]) => void;
  answerQuestion: (questionIndex: number, answerIndex: number) => void;
  submitTest: () => TestResult;
  clearHistory: () => void;
  addXp: (amount: number) => void;
  completeDailyCheckIn: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      onboardingCompleted: false,
      selectedVehicleType: 'code8',
      testHistory: [],
      currentTest: null,
      gamification: {
        xp: 0,
        streak: 0,
        badges: [],
        lastActiveDate: null,
      },

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
        const { currentTest, selectedVehicleType, testHistory, addXp } = get();
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

        const xpGain = score >= 80 ? 60 : 30;
        addXp(xpGain);

        set((state) => ({
          testHistory: [result, ...state.testHistory],
          currentTest: null,
        }));

        return result;
      },

      addXp: (amount) =>
        set((state) => ({
          gamification: {
            ...state.gamification,
            xp: state.gamification.xp + amount,
          },
        })),

      completeDailyCheckIn: () =>
        set((state) => {
          const today = new Date().toISOString().slice(0, 10);
          const lastActive = state.gamification.lastActiveDate;
          const currentStreak = state.gamification.streak;

          let nextStreak = 1;
          if (lastActive) {
            const lastDate = new Date(lastActive);
            const lastDateKey = lastDate.toISOString().slice(0, 10);
            const diffDays = Math.floor((new Date(today).getTime() - new Date(lastDateKey).getTime()) / 86400000);

            if (diffDays === 0) {
              return state;
            }

            nextStreak = diffDays === 1 ? currentStreak + 1 : 1;
          }

          const xpGain = 25;
          const badges = [...state.gamification.badges];
          if (nextStreak >= 3 && !badges.includes('Streak 3')) badges.push('Streak 3');
          if (nextStreak >= 7 && !badges.includes('Road Legend')) badges.push('Road Legend');

          return {
            gamification: {
              ...state.gamification,
              xp: state.gamification.xp + xpGain,
              streak: nextStreak,
              badges,
              lastActiveDate: today,
            },
          };
        }),

      clearHistory: () => set({ testHistory: [] }),
    }),
    {
      name: 'k53-app-store',
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({
        onboardingCompleted: state.onboardingCompleted,
        selectedVehicleType: state.selectedVehicleType,
        testHistory: state.testHistory,
        gamification: state.gamification,
      }),
    }
  )
);
