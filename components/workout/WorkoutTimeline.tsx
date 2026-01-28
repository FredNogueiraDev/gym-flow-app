import { Check, Dumbbell, Maximize2, Repeat, Timer, Weight } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ExerciseMetric } from './ExerciseMetric';

export const WorkoutTimeline = ({ exercises, completedIndices, onToggle, onSelect, isModalOpen}: any) => {
  return (
    <View className={`${isModalOpen ? 'pb-24' : 'pb-4'}`}>
      {exercises.map((ex: any) => {
        const isDone = completedIndices.includes(ex.id);
        const hasLoad = !!ex.load && ex.load !== '-';

        return (
          <TouchableOpacity 
            key={ex.id}
            onLongPress={() => onSelect(ex)}
            onPress={() => onToggle(ex.id)}
            delayLongPress={500} 
            activeOpacity={0.9} 
            className={`
              mb-4 p-4 rounded-2xl border transition-all relative overflow-hidden
              ${isDone 
                ? 'bg-hunter-green-950/30 border-hunter-green-500/30' 
                : 'bg-twilight-900/20 border-twilight-800/60'
              }
            `}
          >
              <View className="flex-row items-start mb-4">
                <TouchableOpacity 
                  onPress={() => onToggle(ex.id)}
                  className={`w-6 h-6 rounded-lg border items-center justify-center mt-0.5
                    ${isDone 
                      ? 'bg-hunter-green-500 border-hunter-green-500' 
                      : 'border-twilight-600'
                    }
                  `}
                >
                  {isDone && <Check size={14} color="#0c1018" strokeWidth={4} />}
                </TouchableOpacity>

                <View className="flex-1 ml-3 pr-6"> 
                  <Text className={`text-base font-bold uppercase ${isDone ? 'text-hunter-green-100 line-through decoration-hunter-green-500/50' : 'text-white'}`}>
                    {ex.name}
                  </Text>
                  
                  {ex.notes && (
                    <Text numberOfLines={1} className={`text-xs mt-0.5 italic ${isDone ? 'text-hunter-green-500/50' : 'text-hunter-green-500/70'}`}>
                      {ex.notes}
                    </Text>
                  )}
                </View>

                <TouchableOpacity 
                  onPress={(e) => {
                    e.stopPropagation(); 
                    onSelect(ex);
                  }}
                  className="absolute -top-1 -right-2 p-2 opacity-60"
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Maximize2 size={16} color={isDone ? "#86efac" : "#94a3b8"} />
                </TouchableOpacity>
              </View>

              <View className={`flex-row gap-2 ${isDone ? 'opacity-70' : 'opacity-100'}`}>
                <ExerciseMetric label="Séries" value={ex.series} icon={Dumbbell} highlight={isDone} />
                <ExerciseMetric label="Reps" value={ex.reps} icon={Repeat} highlight={isDone} />
                <ExerciseMetric label="Descanso" value={ex.rest} icon={Timer} highlight={isDone} />
                
                {hasLoad && (
                  <ExerciseMetric label="Carga" value={ex.load} icon={Weight} highlight={isDone} />
                )}
              </View>

          </TouchableOpacity>
        );
      })}
    </View>
  );
};