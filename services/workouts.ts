import { supabase } from "@/lib/supabase";

export async function getWorkoutsWithExercises() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('workouts')
    .select(`
      id,
      label,
      name,
      description,
      exercises (
        id,
        name,
        series,
        reps,
        load,
        rest,
        notes,
        order,
        video_url
      )
    `)
    .eq('user_id', user.id)
    .order('id', { ascending: true }); // Ordena os treinos

  if (error) {
    console.log('Erro workotus:', error);
    return [];
  }

  // Ordena os exercícios dentro de cada treino
  return data.map((workout: any) => ({
    ...workout,
    identificador: workout.label, // Adaptando para usar sua prop 'identificador'
    grupo: workout.name,          // Adaptando para usar sua prop 'grupo'
    exercicios: (workout.exercises || []).sort((a: any, b: any) => a.order - b.order)
  }));
}

// Busca os logs da sessão ativa (se houver)
export async function getActiveSessionLogs() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { sessionId: null, completed: [] };

  // 1. Busca sessão sem finished_at
  const { data: session } = await supabase
    .from('workout_sessions')
    .select('id')
    .eq('user_id', user.id)
    .is('finished_at', null)
    .order('started_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!session) return { sessionId: null, completed: [] };

  // 2. Busca logs dessa sessão
  const { data: logs } = await supabase
    .from('exercise_logs')
    .select('exercise_id')
    .eq('session_id', session.id);

  return { 
    sessionId: session.id, 
    completed: (logs || []).map((l: any) => l.exercise_id) 
  };
}