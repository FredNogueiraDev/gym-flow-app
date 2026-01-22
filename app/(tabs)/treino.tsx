import { ExerciseModal } from '@/components/workout/ExerciseModal';
import { FocusBanner } from '@/components/workout/FocusBanner';
import { WorkoutFooter } from '@/components/workout/WorkoutFooter';
import { WorkoutSelector } from '@/components/workout/WorkoutSelector';
import { WorkoutTimeline } from '@/components/workout/WorkoutTimeline';
import { useWorkoutProgress } from '@/hooks/useWorkoutProgress';
import { getActiveSessionLogs, getWorkoutsWithExercises } from '@/services/workouts';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

export default function TreinoScreen() {
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [initialData, setInitialData] = useState<{ sessionId: number | null, completed: number[] }>({ sessionId: null, completed: [] });
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  
  const weekday = new Date().getDay(); 
  const initialIndex = weekday === 0 ? 0 : weekday - 1; 
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    async function load() {
      const wData = await getWorkoutsWithExercises();
      const sData = await getActiveSessionLogs();
      setWorkouts(wData);
      setInitialData(sData);
      
      if (wData.length > 0 && initialIndex >= wData.length) {
        setActiveIndex(0);
      }
      
      setLoading(false);
    }
    load();
  }, [initialIndex]);

  const activeWorkout = workouts[activeIndex];

  const { concluidos, toggleExercicio, finalizarTreino, cancelarTreino, progresso } = useWorkoutProgress(
    activeWorkout?.id,
    initialData.completed,
    activeWorkout?.exercicios,
    initialData.sessionId
  );

  if (loading) {
    return (
      <View className="flex-1 bg-twilight-950 justify-center items-center">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  if (!activeWorkout) {
    return (
      <View className="flex-1 bg-twilight-950 justify-center items-center p-6">
        <Text className="text-white text-center">Nenhum treino encontrado.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-twilight-950 pt-12">
      <View className="px-6 mb-4">
        <Text className="text-white font-black text-2xl">Cronograma de Treino</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
        <WorkoutSelector 
          activeIndex={activeIndex} 
          options={workouts} 
          onSelect={setActiveIndex} 
        />
        
        <FocusBanner group={activeWorkout.grupo} />
        
        <WorkoutTimeline 
          exercises={activeWorkout.exercicios}
          completedIndices={concluidos}
          onToggle={toggleExercicio}
          onSelect={setSelectedExercise}
        />
      </ScrollView>

      <WorkoutFooter 
        progress={progresso}
        total={activeWorkout.exercicios.length}
        onFinish={finalizarTreino}
        onReset={cancelarTreino}
      />

      <ExerciseModal
        isOpen={!!selectedExercise}
        onClose={() => setSelectedExercise(null)}
        exercise={selectedExercise}
      />
    </View>
  );
}