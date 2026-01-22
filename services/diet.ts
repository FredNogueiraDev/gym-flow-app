/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "@/lib/supabase";

function parseMacros(macroString: string | null) {
  if (!macroString) return null;

  try {
    const p = macroString.match(/Prot:\s*(.*?)(?:g|$|\|)/i)?.[1]?.trim();
    const c = macroString.match(/Carb:\s*(.*?)(?:g|$|\|)/i)?.[1]?.trim();
    const f = macroString.match(/Gord:\s*(.*?)(?:g|$|\|)/i)?.[1]?.trim();

    return {
      protein: p || '0',
      carbs: c || '0',
      fat: f || '0',
    };
  } catch (e) {
    return null;
  }
}

export async function getActiveDietPlan() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data, error } = await supabase
    .from('diet_plans')
    .select(`
      id,
      name,
      meals (
        id,
        title,
        time,
        order,
        meal_options (
          id,
          name,
          macros,
          items
        )
      ),
      supplements (
        id,
        name,
        dosage
      )
    `)
    .eq('user_id', user.id)
    .eq('is_active', true)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const sortedMeals = (data.meals || []).sort((a: any, b: any) => a.order - b.order);

  return {
    titulo: data.name,
    refeicoes: sortedMeals.map((meal: any) => ({
      id: meal.id,
      titulo: meal.title,
      horario: meal.time,
      opcoes: (meal.meal_options || []).map((opt: any) => ({
        id: opt.id,
        nome: opt.name,
        macros: parseMacros(opt.macros), 
        itens: Array.isArray(opt.items) ? opt.items : JSON.parse(opt.items || '[]'),
      })),
    })),
    suplementos: (data.supplements || []).map((sup: any) => ({
      id: sup.id,
      nome: sup.name,
      dose: sup.dosage,
    })),
  };
}