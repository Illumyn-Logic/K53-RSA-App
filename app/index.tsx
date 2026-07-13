import { Redirect } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';

export default function Index() {
  const onboardingCompleted = useAppStore((state) => state.onboardingCompleted);
  return <Redirect href={onboardingCompleted ? '/(tabs)/home' : '/(onboarding)'} />;
}