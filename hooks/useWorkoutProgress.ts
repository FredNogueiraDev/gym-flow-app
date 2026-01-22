import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export function useWorkoutProgress(
  workoutId: number,
  initialCompleted: number[] = [],
  allExercises: any[] = [],
  initialSessionId: number | null = null
) {
  const [concluidos, setConcluidos] = useState<number[]>(initialCompleted);
  const [sessionId, setSessionId] = useState<number | null>(initialSessionId);

  // Sincroniza se mudar externamente
  useEffect(() => {
    setConcluidos(initialCompleted);
    setSessionId(initialSessionId);
  }, [initialCompleted, initialSessionId]);

  // Função auxiliar para garantir que existe uma sessão
  async function ensureSession() {
    if (sessionId) return sessionId;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Cria nova sessão
    const { data, error } = await supabase
      .from('workout_sessions')
      .insert({
        user_id: user.id,
        workout_id: workoutId,
      })
      .select('id')
      .single();

    if (error || !data) {
      Alert.alert('Erro', 'Não foi possível iniciar o treino.');
      return null;
    }

    setSessionId(data.id);
    return data.id;
  }

  // Toggle Checkbox
  async function toggleExercicio(exerciseId: number) {
    const isCompleted = concluidos.includes(exerciseId);

    // Atualiza UI Otimista
    setConcluidos(prev => 
      isCompleted ? prev.filter(id => id !== exerciseId) : [...prev, exerciseId]
    );

    const activeSessionId = await ensureSession();
    if (!activeSessionId) return;

    if (isCompleted) {
      // Remover log
      await supabase
        .from('exercise_logs')
        .delete()
        .match({ session_id: activeSessionId, exercise_id: exerciseId });
    } else {
      // Adicionar log
      await supabase
        .from('exercise_logs')
        .insert({ session_id: activeSessionId, exercise_id: exerciseId });
    }
  }

  // Finalizar Treino
  async function finalizarTreino() {
    if (!sessionId) return;
    
    const { error } = await supabase
      .from('workout_sessions')
      .update({ finished_at: new Date().toISOString() })
      .eq('id', sessionId);

    if (!error) {
      setSessionId(null);
      setConcluidos([]);
      Alert.alert('Sucesso', 'Treino finalizado e salvo!');
    }
  }

  // Cancelar/Zerar Treino
  async function cancelarTreino() {
    if (!sessionId) {
      setConcluidos([]);
      return;
    }

    // Apaga a sessão (logs apagam em cascade se configurado no banco, senão apagar logs antes)
    const { error } = await supabase
      .from('workout_sessions')
      .delete()
      .eq('id', sessionId);

    if (!error) {
      setSessionId(null);
      setConcluidos([]);
    }
  }

  return {
    concluidos,
    toggleExercicio,
    finalizarTreino,
    cancelarTreino,
    progresso: concluidos.length
  };
}