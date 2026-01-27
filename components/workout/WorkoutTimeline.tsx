import { Check, Maximize2 } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const WorkoutTimeline = ({ exercises, completedIndices, onToggle, onSelect }: any) => {
  return (
    <View className="pb-24">
      {exercises.map((ex: any) => {
        const isDone = completedIndices.includes(ex.id);

        return (
          <TouchableOpacity 
            key={ex.id}
            onLongPress={() => onSelect(ex)} 
            onPress={() => onToggle(ex.id)}
            delayLongPress={500} 
            activeOpacity={0.9} 
            className={`
              mb-4 p-4 rounded-2xl border transition-all relative overflow-hidden flex-row
              ${isDone 
                ? 'bg-hunter-green-950/30 border-hunter-green-500/30' 
                : 'bg-twilight-900/20 border-twilight-800/60'
              }
            `}
          >
              <TouchableOpacity 
                onPress={() => onToggle(ex.id)}
                className={`w-6 h-6 rounded-lg border items-center justify-center mt-1
                  ${isDone 
                    ? 'bg-hunter-green-500 border-hunter-green-500' 
                    : 'border-twilight-600'
                  }
                `}
              >
                {isDone && <Check size={14} color="#0c1018" strokeWidth={4} />}
              </TouchableOpacity>

              {/* 2. Conteúdo Central */}
              <View className="flex-1 pl-2"> 
                <Text className={`text-base font-bold uppercase mb-1 ${isDone ? 'text-hunter-green-100 line-through decoration-hunter-green-500/50' : 'text-white'}`}>
                  {ex.name}
                </Text>
                
                <View className="flex-row flex-wrap gap-2">
                  <Badge label={`${ex.series} séries`} />
                  <Badge label={`${ex.reps} reps`} />
                  {ex.load && <Badge label={`${ex.load}`} color="text-yellow-400" />}
                  <Badge label={ex.rest} />
                </View>
                
                {ex.notes && (
                  <Text numberOfLines={1} className="text-twilight-400 text-xs mt-2 italic">
                    Note: {ex.notes}
                  </Text>
                )}
              </View>

              {/* 3. Botão de Expandir (Novo) - Canto Superior Direito */}
              <TouchableOpacity 
                onPress={() => onSelect(ex)}
                className="p-2 -mt-2 -mr-2 h-10 w-10 items-center justify-start opacity-50"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Maximize2 size={16} color="#94a3b8" />
              </TouchableOpacity>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Badge = ({ label, color = "text-twilight-300" }: { label: string, color?: string }) => (
  <View className="bg-twilight-950/50 px-2 py-1 rounded border border-white/5">
    <Text className={`text-[10px] font-bold ${color}`}>{label}</Text>
  </View>
)