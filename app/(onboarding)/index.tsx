import { useRef, useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Welcome to K53 Prep',
    description: "Pass your learner's license the first time with our comprehensive study tools.",
    icon: '📚',
  },
  {
    id: '2',
    title: 'Study and Practice',
    description: 'Learn road rules, road signs, and vehicle controls. Take unlimited practice tests.',
    icon: '📝',
  },
  {
    id: '3',
    title: 'Track Your Progress',
    description: 'Monitor your test history, identify weak areas, and get pass predictions.',
    icon: '📊',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const setOnboardingCompleted = useAppStore((state) => state.setOnboardingCompleted);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      return;
    }

    setOnboardingCompleted(true);
    router.replace('/(tabs)/home');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ width, padding: 40, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text style={{ fontSize: 72, marginBottom: 20 }}>{item.icon}</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 16, textAlign: 'center', color: '#666' }}>{item.description}</Text>
          </View>
        )}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 }}>
        {slides.map((slide, index) => (
          <View
            key={slide.id}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 5,
              backgroundColor: index === currentIndex ? '#007AFF' : '#ccc',
            }}
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={handleNext}
        style={{
          backgroundColor: '#007AFF',
          marginHorizontal: 40,
          paddingVertical: 16,
          borderRadius: 30,
          marginBottom: 40,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600', marginRight: 8 }}>
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>→</Text>
      </TouchableOpacity>
    </View>
  );
}
