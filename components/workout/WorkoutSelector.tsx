import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface WorkoutSelectorProps {
  activeIndex: number;
  options: any[];
  onSelect: (i: number) => void;
  sessionActive: boolean; // Nova prop
}

export const WorkoutSelector = ({ activeIndex, options, onSelect, sessionActive }: WorkoutSelectorProps) => {
  if (sessionActive) {
    const activeItem = options[activeIndex];
    
    return (
      <View className="h-14 mb-4 px-1"> 
        <View className="flex-1 bg-hunter-green-500 rounded-2xl border border-hunter-green-400 items-center justify-center w-full">
           <Text className="text-twilight-950 text-xs font-bold uppercase tracking-widest">
              {activeItem?.identificador} • Em Andamento
           </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="mb-4">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ gap: 12, paddingHorizontal: 4 }}
      >
        {options.map((t, idx) => {
          const isActive = activeIndex === idx;
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => onSelect(idx)}
              className={`
                h-14 w-14 rounded-2xl border items-center justify-center
                ${isActive
                  ? 'bg-hunter-green-500 border-hunter-green-400'
                  : 'bg-twilight-900/50 border-twilight-800'
                }
              `}
            >
              <Text 
                className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-twilight-950' : 'text-twilight-400'}`}
              >
                {t.identificador}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  );
};