import questionsData from '@/data/questions.json';
import type { Question } from '@/store/useAppStore';

export function getQuestions(category: string, count: number): Question[] {
  let pool = questionsData.questions.filter((q) => q.category === category);

  if (pool.length === 0) {
    pool = questionsData.questions;
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
